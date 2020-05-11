const Result = require("../models/resultsModel");
const { shuffle } = require("../../utilities");
const uuid = require("uuid");
module.exports = {
  createResult: (playerToChoose, finishesAt) => {
    const newResult = {
      round: 1,
      expires: new Date().getTime(),
      _id: uuid.v1(),
      finishesAt,
      playerToChoose,
    };
    return Result.insertMany(newResult)
      .then((r) => {
        return r;
      })
      .catch((e) => console.log("error", e));
  },

  addResults: (votes, voters, round, finishesAt, _id, playersList) => {
    Result.findOne({ _id })
      .select({
        playerTurn: 1,
      })
      .then((d) => {
        const length = playersList.length;
        const pos = d.playerTurn % length;
        Result.updateOne(
          { _id },
          {
            $push: { votersList: shuffle(voters), voteResultList: votes },
            round: round + 1,
            finishesAt,
            playerTurn: d.playerTurn + 1,
            playerToChoose: playersList[pos],
          }
        ).exec();
      });
  },

  getVfmCount: (_id) => {
    return Result.findOne({ _id })
      .select({
        playerTurn: 1,
        round: 1,
        playerToChoose: 1,
      })
      .then((d) => {
        return !d
          ? null
          : Result.findOne({
              _id,
              votesForMission: {
                // returning all
                $elemMatch: { round: d.round },
              },
            }).then((r) => {
              return r ? r : d;
            });
      });
  },

  getPlayerTurn: (_id) => {
    return Result.findOne({ _id })
      .select("playerTurn")
      .then((r) => {
        return r === null ? 1 : r.playerTurn;
      });
  },

  getRound: (_id) => {
    return Result.findOne({ _id })
      .select("round")
      .then((r) => {
        return r === null ? 1 : r.round;
      });
  },

  addVotesFormMission: (username, vote, _id) => {
    Result.findOne({ _id })
      .select({
        playerTurn: 1,
        round: 1,
      })
      .then((d) => {
        Result.updateOne(
          { _id },
          {
            $push: {
              votesForMission: {
                username,
                vote,
                playerTurn: d.playerTurn,
                round: d.round,
              },
            },
          }
        ).exec();
      });
  },

  addPlayerTurn: (_id, finishesAt, playersList, selectedNames, selector) => {
    Result.findOne({ _id })
      .select({
        playerTurn: 1,
        round: 1,
      })
      .then((d) => {
        const length = playersList.length;
        const pos = d.playerTurn % length;
        Result.updateOne(
          { _id },
          {
            $set: { playerTurn: d.playerTurn + 1 },
            finishesAt,
            playerToChoose: playersList[pos],
            $push: {
              selectedNames: {
                selectedNames,
                selector,
                round: d.round,
                playerTurn: d.playerTurn,
              },
            },
          }
        ).exec();
      });
  },

  get: (id) => {
    return Result.findOne({ _id: id })
      .select()
      .then((r) => {
        return r;
      });
  },

  getTimeLeft: (id) => {
    return Result.findOne({ _id: id })
      .select("finishesAt")
      .then((r) => {
        return r;
      });
  },

  deleteLastRound: (_id, round) => {
    round++;
    return Result.findOne({ _id })
      .select("votesForMission")
      .then((r) => {
        const pt = r.votesForMission
          .filter((r) => r.round === round)
          .reduce((p, n) => (p.playerTurn < n.playerTurn ? p : n));

        Result.updateOne(
          { _id },
          {
            $pop: { voteResultList: 1, votersList: 1, selectedNames: 1 },
            round: round,
            $pull: { votesForMission: { round: round } },
            playerTurn: pt.playerTurn,
          }
        ).exec();
      });
  },

  deleteLastVoteFormission: (_id, playerTurn, round) => {
    Result.updateOne(
      { _id },
      {
        $pull: {
          votesForMission: { playerTurn: playerTurn, round },
        },
        playerTurn: playerTurn,
      }
    ).exec();
  },

  deleteRound: (_id, round) => {
    // no work
    Result.updateOne(
      { _id },
      {
        $unset: {
          "voteResultList.$[element]": 1,
          "votersList.$[element]": 1,
        },
      },
      {
        arrayFilters: [{ element: clear - show - results }],
        upsert: true,
      }
    ).exec();

    Result.updateOne(
      { _id },
      { $pull: { voteResultList: null, votersList: null } }
    ).exec();
  },
};
