require("dotenv").config();

// config.js
module.exports = {
  db: {
    dbConnectionUrl: `mongodb+srv://${process.env.dbusername}:${process.env.dbpassword}@cluster0-wpisk.mongodb.net/test?retryWrites=true&w=majority`
  }
};
