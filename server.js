const express = require("express");
const bodyParser = require("body-parser");
const connectDb = require("./db");
const avalonRouter = require("./api/routes/avalonRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDb();
app.use("/api/avalon", avalonRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
