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
          resultsController.addResults(
            shuffle(votes),
            shuffle(names),
            round,
            setFinishTime(),
            id
          );
        });
      }
      gameController.setVoteAndRound(isVisible, round);
      io.emit("clear-show-results", isVisible);
    });

    socket.on("player-list", () => {
      const playersCallback = gameController.getPlayers();
      playersCallback.then((pList) => io.emit("player-list", pList));
    });

    socket.on("game-results", () => {
      const idCb = gameController.getResultId();
      idCb.then((id) => {
        const resultsCb = resultsController.get(id);
        resultsCb.then((c) => {
          io.emit(
            "game-results",
            c,
            convertToMultipleArray(c.votesForMission, c.playerTurn, c.round)
          );
          var a = convertToMultipleArray(
            c.votesForMission,
            c.playerTurn,
            c.round
          );
        });
      });
    });

    socket.on("delete-round", (round, id) => {
      resultsController.deleteLastRound(id, round);
    });

    socket.on("started-at", () => {
      const idCb = gameController.getResultId();
      idCb.then((id) => {
        const resultsCb = resultsController.getTimeLeft(id);

        resultsCb.then((c) => {
          c && io.emit("started-at", getSecondsLeft(c.finishesAt));
        });
      });
    });

    socket.on("list", () => {
      const playersCallback = gameController.getPlayersAndCharacteres();
      const id = socket.id;

      playersCallback.then((docs) => {
        io.to(id).emit(
          "list",
          docs.playersList,
          docs.characteresList.map((c) => capitalize(c)),
          docs.resultId,
          docs.round
        );
      });
    });

    socket.on("shuffle-list", () => {
      gameController.reorderPlayers();
    });

    socket.on("submit-count", (count) => {
      socket.broadcast.emit("submit-count", count);
    });

    socket.on("distribute", (roles, names) => {
      io.emit("clear-show-results", false);
      const lastGameListCB = gameController.getDistributionList();
      lastGameListCB.then((gList) => {
        const distributionList = distributeRoles(names, roles, gList);
        roles = roles.map((r) => r.toLowerCase());
        names = shuffle(names);
        const resultIdCb = resultsController.createResult(setFinishTime());
        resultIdCb.then((r) => {
          gameController.newGame({
            names,
            distributionList,
            roles,
            resultId: r[0].id,
          });
          io.emit("roles", distributionList);
          io.emit("result-id", r[0].id);
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

    socket.on("accept-mission", (username, vote) => {
      const idCb = gameController.getResultId();
      idCb.then((id) => {
        resultsController.addVotesFormMission(username, vote, id);
      });
    });

    socket.on("show-accept-mission", () => {
      const idCb = gameController.getResultId();
      idCb.then((id) => {
        resultsController.addPlayerTurn(id);
      });
    });

    socket.on("logout", (username) => {
      gameController.removePlayer(username);
    });
  });
};

module.exports = ioWorker;
