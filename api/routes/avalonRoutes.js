const express = require("express");
const router = express.Router();
const Vote = require("../models/voteModel");

router.post("/", (req, res) => {
  const newVote = {
    vote: req.body.vote,
    expires: new Date(Date.now()),
    t: new Date(Date.now())
  };

  Vote.insertMany(newVote)
    .then(() => {
      console.log("Inserted");
    })
    .catch(e => console.log("error", e));
});

router.get("/", async (req, res) => {
  await Vote.find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
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
