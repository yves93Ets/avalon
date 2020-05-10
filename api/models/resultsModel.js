const mongoose = require("mongoose");

const resultsSchema = new mongoose.Schema({
  _id: String,
  votersList: [[String]],
  voteResultList: [[Boolean]],
  round: Number,
  expires: Date,
  finishesAt: Date,
  playerTurn: { type: Number, default: 1 },
  playerToChoose: String,
  votesForMission: [Object],
});

module.exports = mongoose.model("Result", resultsSchema);
