const Vote = require("../models/voteModel");
module.exports = {
  getAll: (req, res) => {
    Vote.find()
      .exec()
      .then((docs) => {
        const votes = docs.map((d) => {
          return d.vote;
        });
        res.status(200).json(votes);
      });
  },
  deleteAll: (req, res) => {
    Vote.deleteMany({})
      .exec()
      .then((docs) => {
        res.status(200).json({ deleted: docs.deletedCount });
      })
      .catch((err) => console.log("error", err));
  },
  add: (req, res) => {
    const newVote = {
      vote: req.body.vote,
      expires: new Date(Date.now()),
    };

    Vote.insertMany(newVote)
      .then(res.status(200).json(newVote))
      .catch((e) => console.log("error", e));
  },
};
