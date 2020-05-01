const mongoose = require("mongoose");

//mongoose schema
const gameSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  room: { type: String, default: "Avalon" },
  distributionList: [Object],
  playersList: [String],
  characteresList: [String],
  playerTurn: { type: Number, default: 1 },
  round: { type: Number, default: 1 },
  resultId: String,
  showResults: { type: Boolean, default: false },
  expires: Date,
});

module.exports = mongoose.model("Game", gameSchema);
