const mongoose = require("mongoose");

//mongoose schema
const gameSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  room: { type: String, default: "Avalon" },
  oldList: [String],
  newList: [String],
  playersList: [String],
  characteresList: [String],
  position: Number,
  showResults: Boolean,
  expires: Date,
});

module.exports = mongoose.model("Game", gameSchema);
