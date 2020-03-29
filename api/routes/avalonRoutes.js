const express = require("express");
const router = express.Router();
const Vote = require("../models/voteModel");

router.post("/", async (req, res) => {
  const newVote = {
    vote: req.body.vote
    //expires: new Date(Date.now())
  };

  await Vote.insertMany(newVote).catch(e => console.log("error", e));
});

router.get("/", async (req, res) => {
  await Vote.find()
    .exec()
    .then(docs => {
      const votes = docs.map(d => {
        return d.vote;
      });
      res.status(200).json(votes);
    });
});

router.delete("/", async (req, res) => {
  await Vote.deleteMany({})
    .exec()
    .then(docs => {
      res.status(200);
    });
});

module.exports = router;
