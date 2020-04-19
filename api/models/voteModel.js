const mongoose = require("mongoose");

//mongoose schema
const voteSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  vote: Boolean,
  expires: Date
});

module.exports = mongoose.model("Vote", voteSchema);

// ttl index
//fields - >{ "expires": 1 }, options -> { expireAfterSeconds: 3600 }
