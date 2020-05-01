const mongoose = require("mongoose");

const resultsSchema = new mongoose.Schema({
  _id: String,
  votersList: [[String]],
  voteResultList: [[Boolean]],
  round: Number,
  expires: Date,
});

module.exports = mongoose.model("Result", resultsSchema);
