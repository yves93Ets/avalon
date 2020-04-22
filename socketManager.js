const socket = require("socket.io");
const { removeUser, addUser, getUserNames } = require("./service/userService");
const ioWorker = async (server) => {
  const io = socket(server);

  io.on("connection", (socket) => {
    console.log(socket.id, "connected");

    socket.on("reconnect_attempt", () => {
      socket.io.opts.transports = ["websocket", "polling"];
    });

    socket.on("send-name", (name) => {
      socket.username = name;
      addUser(name);
    });

    socket.on("clear-show-results", (isVisible) => {
      io.emit("clear-show-results", isVisible);
    });

    socket.on("submit-count", (count) => {
      socket.broadcast.emit("submit-count", count);
    });

    socket.on("disconnecting", (name) => {
      removeUser(name);
    });
  });
};

module.exports = ioWorker;
