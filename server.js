const express = require("express");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const avalonRouter = require("./api/routes/avalonRoutes");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const connectDb = require("./db");
const http = require("http");
const server = http.createServer(app);
const io = socketIo(server);

//Setting up a socket with the namespace "connection" for new sockets
io.on("connection", (socket) => {
  // just like on the client side, we have a socket.on method that takes a callback function
  //Here we listen on a new namespace called "change color"

  socket.on("submit count", (count) => {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    io.sockets.emit("submit count", count);
  });

  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
connectDb();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/avalon", avalonRouter);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

server.listen(port, () => console.log(`Listening on port ${port}`));
