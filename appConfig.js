require("dotenv").config();

// config.js
module.exports = {
  db: {
    dbConnectionUrl: `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0-wpisk.mongodb.net/test?retryWrites=true&w=majority`,
  },
};
