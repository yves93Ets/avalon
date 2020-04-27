const express = require("express");
const router = express.Router();
const voteController = require("../controllers/voteController");
const gameController = require("../controllers/gameController");

router.get("/", voteController.getAll);
router.delete("/", voteController.deleteAll);
router.post("/", voteController.add);

router.post("/players", gameController.addPlayer);
router.get("/players", gameController.getPlayers);
router.post("/players:game", gameController.newGame);
router.delete("/players", gameController.getPlayers);

module.exports = router;
