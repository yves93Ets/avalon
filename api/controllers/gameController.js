const Game = require("../models/gameModel");
const { shuffle } = require("../../utilities");

module.exports = {
  getResultId: () => {
    return Game.findOne({ room: "Avalon" })
      .select("resultId")
      .then((r) => r.resultId);
  },

  addPlayer: (name) => {
    //  add name
    Game.updateOne({ room: "Avalon" }, { $push: { playersList: name } }).exec();
  },

  removePlayer: (name) => {
    console.log(name);
    Game.updateOne({ room: "Avalon" }, { $pull: { playersList: name } }).exec();
  },

  updatePlayer: (newName, oldName) => {
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

  getPlayersAndCharacteres: () => {
    return Game.findOne({ room: "Avalon" })
      .select({
        playersList: 1,
        characteresList: 1,
        _id: 0,
        round: 1,
        resultId: 1,
      })
      .then((docs) => {
        return docs;
      });
  },

  getRole: (username) => {
    return Game.findOne(
      { room: "Avalon" },
      { distributionList: { $elemMatch: { username } } }
    )
      .select("distributionList")
      .then((docs) => {
        return docs.distributionList;
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
  newGame: (game) => {
    // const game = req.params.stopId;
    const newGame = {
      Gamename: "Avalon",
      playersList: game.names,
      distributionList: game.distributionList,
      characteresList: game.roles,
      playerTurn: 1,
      round: 1,
      resultId: game.resultId,
      showResults: false,
      //expires: new Date(Date.now()),
    };
    Game.updateOne({ room: "Avalon" }, newGame).exec();
  },

  setVoteAndRound: (isVisible, round) => {
    Game.updateOne(
      { room: "Avalon" },
      { $set: { showResults: isVisible, round } }
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
