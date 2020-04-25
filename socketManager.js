const socket = require("socket.io");
const {
  removeUser,
  addUser,
  getUserNames,
  shuffleNames,
  emptyUsersList,
} = require("./services/userService");
const distributeRoles = require("./services/distributeRoles");

const ioWorker = (server) => {
  const io = socket(server);

  io.on("connection", (socket) => {
    console.log(socket.id, "connected");

    socket.on("reconnect_attempt", () => {
      socket.io.opts.transports = ["websocket", "polling"];
    });

    socket.on("login", (name) => {
      socket.username = name;
      addUser(name);
    });

    socket.on("rename", (newName, oldName) => {
      socket.username = newName;
      addUser(newName);
      removeUser(oldName);
    });

    socket.on("remove-names", (name) => {
      emptyUsersList();
    });

    socket.on("clear-show-results", (isVisible) => {
      io.emit("clear-show-results", isVisible);
    });

    socket.on("player-list", () => {
      io.emit("player-list", getUserNames());
    });

    socket.on("shuffle-list", () => {
      shuffleNames();
    });

    socket.on("submit-count", (count) => {
      socket.broadcast.emit("submit-count", count);
    });

    socket.on("distribute", (roles) => {
      const distributedRoles = distributeRoles(getUserNames(), roles);
      io.emit("roles", distributedRoles);
    });

    socket.on("logout", (name) => {
      removeUser(name);
    });
  });
};

module.exports = ioWorker;
