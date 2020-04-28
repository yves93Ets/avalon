const Game = require("../models/gameModel");
const shuffle = require("../../utilities");

module.exports = {
  addPlayer: (name) => {
    //  add name
    console.log(name);
    Game.updateOne({ room: "Avalon" }, { $push: { playersList: name } }).exec();
  },
  updatePlayer: (newName, oldName) => {
    //  add name
    Game.updateOne(
      { room: "Avalon" },
      { $set: { "playersList.$[element]": newName } },
      {
        arrayFilters: [{ element: oldName }],
        upsert: true,
      }
    ).exec();
  },
  getPlayers: () => {
    return Game.findOne({ room: "Avalon" })
      .select("playersList")
      .then((docs) => {
        return docs.playersList;
      });
  },

  getDistributionList: () => {
    return Game.findOne({ room: "Avalon" })
      .select("distributionList")
      .then((docs) => {
        return docs.distributionList;
      });
  },
  reorderPlayers: () => {
    return Game.findOne({ room: "Avalon" })
      .select("playersList")
      .then((docs) => {
        const newList = shuffle(docs.playersList);
        Game.updateOne(
          { room: "Avalon" },
          { $set: { playersList: newList } }
        ).exec();
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
  setVote: (isVisible) => {
    Game.updateOne(
      { room: "Avalon" },
      { $set: { showResults: isVisible } }
    ).exec();
  },

  getVotes: (req, res) => {
    Game.findOne({ room: "Avalon" })
      .select("showResults")
      .then((docs) => {
        res.status(200).json(docs.showResults);
      });
  },
};
