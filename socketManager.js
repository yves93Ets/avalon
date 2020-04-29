const socket = require("socket.io");
const gameController = require("./api/controllers/gameController");
const { shuffle, capitalize } = require("./utilities");

const { removeUser, emptyUsersList } = require("./services/userService");
const distributeRoles = require("./services/distributeRoles");

const ioWorker = (server) => {
  const io = socket(server);

  io.on("connection", (socket) => {
    socket.on("reconnect_attempt", () => {
      socket.io.opts.transports = ["websocket", "polling"];
    });

    socket.on("login", (name) => {
      socket.username = name;
      gameController.addPlayer(name);
    });

    socket.on("rename", (newName, oldName) => {
      gameController.updatePlayer(newName, oldName);

      //  addUser(newName);  used to save players on server
      ///  removeUser(oldName);
    });

    socket.on("remove-names", () => {
      emptyUsersList();
    });

    socket.on("clear-show-results", (isVisible, round) => {
      gameController.setVote(isVisible, round);
      io.emit("clear-show-results", isVisible);
    });

    socket.on("player-list", () => {
      const playersCallback = gameController.getPlayers();
      playersCallback.then((pList) => io.emit("player-list", pList));
    });

    socket.on("list", () => {
      const playersCallback = gameController.getPlayersAndCharacteres();
      const id = socket.id;

      playersCallback.then((docs) => {
        io.to(id).emit(
          "list",
          docs.playersList,
          docs.characteresList.map((c) => capitalize(c))
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
      const lastGameListCB = gameController.getDistributionList();
      lastGameListCB.then((gList) => {
        const distributionList = distributeRoles(names, roles, gList);
        roles = roles.map((r) => r.toLowerCase());
        names = shuffle(names);
        gameController.newGame({ names, distributionList, roles });
        io.emit("roles", distributionList);
      });
    });

    socket.on("my-role", (username) => {
      const roleCb = gameController.getRole(username);
      const id = socket.id;
      roleCb.then((r) => {
        io.to(id).emit("roles", r);
      });
    });

    socket.on("logout", (name) => {
      removeUser(name);
    });
  });
};

module.exports = ioWorker;
