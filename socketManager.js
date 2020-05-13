const socket = require("socket.io");
const gameController = require("./api/controllers/gameController");
const resultsController = require("./api/controllers/resultsController");
const voteController = require("./api/controllers/voteController");
const {
  shuffle,
  capitalize,
  setFinishTime,
  getSecondsLeft,
  convertToMultipleArray,
  calculateVotes,
  getSelectedNamesByTurn,
} = require("./utilities");

const { emptyUsersList } = require("./services/userService");
const distributeRoles = require("./services/distributeRoles");

const ioWorker = (server) => {
  const io = socket(server, {
    transports: ["websocket"],
  });

  io.on("connection", (socket) => {
    socket.on("reconnect_attempt", () => {
      socket.io.opts.transports = ["websocket"];
    });

    socket.on("login", (name) => {
      socket.username = name;
      gameController.addPlayer(name);
    });

    socket.on("rename", (newName, oldName) => {
      gameController.updatePlayer(newName, oldName);
    });

    socket.on("remove-names", () => {
      emptyUsersList();
    });

    socket.on("clear-show-results", (isVisible, id, round) => {
      if (isVisible) {
        const votesCb = voteController.getAll();
        const votes = [],
          names = [];
        votesCb.then((d) => {
          d.map((v) => {
            votes.push(v.vote);
            names.push(v.username);
          });

          const playersCallback = gameController.getPlayersAndResultId();
          playersCallback.then((pList) => {
            resultsController.addResults(
              shuffle(votes),
              names,
              setFinishTime(),
              id,
              pList.playersList
            );
          });
        });
      }
      gameController.setVoteAndRound(isVisible, round);
      io.emit("clear-show-results", isVisible);
    });

    socket.on("player-list", () => {
      const playersCallback = gameController.getPlayersAndResultId();
      playersCallback.then((pList) => {
        const rcb = resultsController.getPlayerTurn(pList.resultId);
        rcb.then((playerTurn) => {
          io.emit("player-list", pList.playersList, playerTurn || 1);
        });
      });
    });

    socket.on("game-results", () => {
      const idCb = gameController.getResultId();
      idCb.then((r) => {
        const resultsCb = resultsController.get(r.resultId);
        resultsCb.then((c) => {
          if (c !== null) {
            io.emit(
              "game-results",
              c,
              convertToMultipleArray(c.votesForMission, c.round)
            );
          }
        });
      });
    });

    socket.on("delete-round", (round, id) => {
      const playersCallback = gameController.getPlayersAndResultId();
      playersCallback.then((pl) => {
        resultsController.deleteLastRound(id, round, pl.playersList);
        const resultsCb = resultsController.get(id);
        resultsCb.then((c) => {
          if (c !== null) {
            io.emit(
              "game-results",
              c,
              convertToMultipleArray(c.votesForMission, c.round)
            );
          }
        });
      });
    });

    socket.on("delete-acceptance-round", (vfm) => {
      const idCb = gameController.getResultId();

      idCb.then((r) => {
        resultsController.deleteLastVoteFormission(
          r.resultId,
          vfm.playerTurn,
          vfm.round,
          r.playersList
        );

        const resultsCb = resultsController.get(r.resultId);
        resultsCb.then((c) => {
          if (c !== null) {
            io.emit(
              "game-results",
              c,
              convertToMultipleArray(c.votesForMission, c.round)
            );
          }
        });
      });
    });

    socket.on("started-at", () => {
      const idCb = gameController.getResultId();
      idCb.then((r) => {
        const resultsCb = resultsController.getTimeLeft(r.resultId);

        resultsCb.then((c) => {
          if (c) {
            io.emit("started", getSecondsLeft(c.finishesAt));
          }
        });
      });
    });

    socket.on("view-timer", (isVisible) => {
      io.emit("view-timer", isVisible);
    });

    socket.on("restart-timer", () => {
      io.emit("restart-timer");
    });

    socket.on("list", () => {
      const playersCallback = gameController.getPlayersAndCharacteres();
      const id = socket.id;

      playersCallback.then((docs) => {
        const roundCb = resultsController.getRound(docs.resultId);
        roundCb.then((round) => {
          io.to(id).emit(
            "list",
            docs.playersList,
            docs.characteresList.map((c) => capitalize(c)),
            docs.resultId,
            round
          );
        });
      });
    });

    socket.on("shuffle-list", () => {
      gameController.reorderPlayers();
    });

    socket.on("submit-count", (count) => {
      socket.broadcast.emit("submit-count", count);
    });

    socket.on("players-mission", () => {
      socket.broadcast.emit("submit-count");
    });

    socket.on("get-secret-vote", () => {
      socket.broadcast.emit("secret-vote");
    });

    socket.on("distribute", (roles, names) => {
      io.emit("clear-show-results", false);
      const lastGameListCB = gameController.getDistributionList();
      lastGameListCB.then((gList) => {
        const distributionList = distributeRoles(names, roles, gList);
        roles = roles.map((r) => r.name.toLowerCase());
        names = shuffle(names);

        const resultIdCb = resultsController.createResult(
          names[0],
          setFinishTime()
        );

        resultIdCb.then((r) => {
          gameController.newGame({
            names,
            distributionList,
            roles,
            resultId: r[0].id,
          });

          io.emit("roles", distributionList);
          io.emit("result-id", r[0].id, r[0].round);
        });
      });
    });

    socket.on("my-role", (username) => {
      const roleCb = gameController.getRole(username);
      const id = socket.id;
      roleCb.then((r) => {
        io.to(id).emit("roles", r);
      });
    });

    socket.on("set-secret-vote", (goToSecretVote) => {
      io.emit("secret-vote", goToSecretVote);
    });

    socket.on("mission-vote-count", () => {
      /// accept vote count
      const idCb = gameController.getResultId();
      idCb.then((g) => {
        const resultCb = resultsController.getVfmCount(g.resultId);
        resultCb.then((v) => {
          if (!v) return;
          if (v.votesForMission) {
            count = v.votesForMission.filter((vfm) => {
              return vfm.playerTurn === v.playerTurn && vfm.round === v.round;
            }).length;

            io.emit(
              "mission-vote-count",
              count,
              g.playersList,
              v.playerToChoose
            );
          } else {
            io.emit("mission-vote-count", 0, g.playersList, v.playerToChoose);
          }
        });
      });
    });

    socket.on("accept-mission", (username, vote) => {
      const idCb = gameController.getResultId();
      idCb.then((r) => {
        resultsController.addVotesFormMission(username, vote, r.resultId);
      });
    });

    socket.on("mission-choices", (names) => {
      io.emit("mission-choices-names", names);
    });

    socket.on("check-acceptance-votes", (selectedNames) => {
      const idCb = gameController.getResultId();
      idCb.then((r) => {
        const av = resultsController.getAcceptanceVotes(r.resultId);
        av.then((d) => {
          const passed = calculateVotes(d);
          if (selectedNames.length === 0) {
            selectedNames = getSelectedNamesByTurn(d);
          }

          io.emit("acceptance-votes-results", selectedNames);
          io.emit("secret-vote", passed);
        });
      });
    });

    socket.on("show-accept-mission", (selectedNames, selector) => {
      const idCb = gameController.getResultId();
      idCb.then((r) => {
        resultsController.addPlayerTurn(
          r.resultId,
          setFinishTime(),
          r.playersList,
          selectedNames,
          selector
        );
      });
    });

    socket.on("logout", (username) => {
      gameController.removePlayer(username);
    });
  });
};

module.exports = ioWorker;
