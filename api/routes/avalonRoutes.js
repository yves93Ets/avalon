const express = require("express");
const router = express.Router();
const voteController = require("../controllers/voteController");
const gameController = require("../controllers/gameController");

router.get("/", voteController.getVotes);
router.delete("/", voteController.deleteAll);
router.post("/", voteController.add);

router.get("/votes", gameController.getVotes);

module.exports = router;
