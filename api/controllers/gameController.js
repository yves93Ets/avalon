const Game = require("../models/gameModel");
const { shuffle } = require("../../utilities");

module.exports = {
  getResultId: () => {
    return Game.findOne({ room: "Avalon" })
      .select({ resultId: 1, playersList: 1 })
      .then((r) => r);
  },

  addPlayer: (name) => {
    Game.findOne({ room: "Avalon", playersList: { $in: [name] } })
      .select("_id")
      .then((g) => {
        if (!g) {
          Game.updateOne(
            { room: "Avalon" },
            { $push: { playersList: name } }
          ).exec();
        }
      });
  },

  removePlayer: (name) => {
    Game.updateOne(
      { room: "Avalon" },
      { $pull: { playersList: { $in: [name] } } }
    ).exec();
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

  getPlayersAndResultId: () => {
    return Game.findOne({ room: "Avalon" })
      .select({ playersList: 1, resultId: 1 })
      .then((docs) => {
        return docs;
      });
  },

  getPlayersAndCharacteres: () => {
    return Game.findOne({ room: "Avalon" })
      .select({
        playersList: 1,
        characteresList: 1,
        resultId: 1,
        _id: 0,
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
    const newGame = {
      Gamename: "Avalon",
      playersList: game.names,
      distributionList: game.distributionList,
      characteresList: game.roles,
      resultId: game.resultId,
      showResults: false,
      //expires: new Date(Date.now()),
    };
    Game.updateOne({ room: "Avalon" }, newGame).exec();
  },

  setVoteAndRound: (isVisible, round) => {
    if (!round) {
      Game.updateOne(
        { room: "Avalon" },
        { $set: { showResults: isVisible } }
      ).exec();
    } else {
      Game.updateOne(
        { room: "Avalon" },
        { $set: { showResults: isVisible, round: round + 1 } }
      ).exec();
    }
  },

  getVotes: (req, res) => {
    Game.findOne({ room: "Avalon" })
      .select("showResults")
      .then((docs) => {
        res.status(200).json(docs.showResults);
      });
  },
};
