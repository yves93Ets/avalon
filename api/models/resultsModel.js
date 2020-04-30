const mongoose = require("mongoose");

const resultsSchema = new mongoose.Schema({
  _id: String,
  VotersList: [[String]],
  VoteResultList: [[String]],
  round: Number,
  expires: Date,
});

module.exports = mongoose.model("Result", resultsSchema);
