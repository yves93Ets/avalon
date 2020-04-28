const socket = require("socket.io");
const gameController = require("./api/controllers/gameController");

const {
  removeUser,
  getUserNames,
  shuffleNames,
  emptyUsersList,
} = require("./services/userService");
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

    socket.on("remove-names", (name) => {
      emptyUsersList();
    });

    socket.on("clear-show-results", (isVisible) => {
      gameController.setVote(isVisible);
      io.emit("clear-show-results", isVisible);
    });

    socket.on("player-list", () => {
      const playersCallback = gameController.getPlayers();
      playersCallback.then((pList) => io.emit("player-list", pList));
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
        const distributedRoles = distributeRoles(names, roles, gList);
        io.emit("roles", distributedRoles);
      });
    });

    socket.on("logout", (name) => {
      removeUser(name);
    });
  });
};

module.exports = ioWorker;
