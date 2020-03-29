const express = require("express");
const bodyParser = require("body-parser");
const avalonRouter = require("./api/routes/avalonRoutes");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const connectDb = require("./db");

connectDb();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/avalon", avalonRouter);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
