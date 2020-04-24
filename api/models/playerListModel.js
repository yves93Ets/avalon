const mongoose = require("mongoose");

//mongoose schema
const voteSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  players: [String],
  expires: Date,
});

module.exports = mongoose.model("Player", voteSchema);
