// mongodb driver
const mongoose = require("mongoose");
const appConfig = require("./appConfig");
const dbConnectionUrl = appConfig.db.dbConnectionUrl;

const connectDb = async () => {
  await mongoose
    .connect(dbConnectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "avalon"
    })
    .catch(e => console.log("error", e));
};

module.exports = connectDb;
