const Game = require("../models/gameModel");
module.exports = {
  addPlayer: (req, res) => {
    //  add name
    name = req.body.name;
    Game.updateOne({ room: "Avalon" }, { $push: { playersList: name } });
  },
  getPlayers: (req, res) => {
    router.get("/players", (req, res) => {
      Game.findOne({ room: "Avalon" })
        .select("playersList")
        .exec()
        .then((docs) => {
          const playersList = docs.map((d) => {
            return d.playersList;
          });
          res.status(200).json(playersList);
        });
    });
  },
  newGame: (req, res) => {
    // const game = req.params.stopId;

    const newGame = {
      Gamename: req.body.Gamename,
      expires: new Date(Date.now()),
    };

    Game.insertMany(newGame)
      .then(res.status(200).json(newGame))
      .catch((e) => console.log("error", e));
  },
  get: (req, res) => {
    //  add name
    name = req.body.name;
    Game.updateOne(
      { room: "Avalon" },
      { $pull: { playersList: { $in: [name] } } }
    );
  },
};
