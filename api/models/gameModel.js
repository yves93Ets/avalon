const mongoose = require("mongoose");

//mongoose schema
const gameSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  room: { type: String, default: "Avalon" },
  distributionList: [Object],
  playersList: [String],
  characteresList: [String],
  playerRound: Number,
  round: Number,
  showResults: Boolean,
  expires: Date,
});

module.exports = mongoose.model("Game", gameSchema);
