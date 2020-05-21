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
    return Result.insertMany(newResult).catch((e) => console.log("error", e));
  },

  addResults: (votes, voters, finishesAt, _id, playersList) => {
    Result.findOne({ _id })
      .select({
        playerTurn: 1,
      })
      .then((d) => {
        // TODO remove playerList
        // const length = playersList.length;
        //const pos = d.playerTurn % length;
        //console.log(2222, pos);

        Result.updateOne(
          { _id },
          {
            $push: { votersList: shuffle(voters), voteResultList: votes },
            $inc: { round: 1 },
            finishesAt,
            //  playerToChoose: playersList[pos],
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

  getMissionNames: (_id) => {
    return Result.findOne({ _id })
      .select("missionNames")
      .then((r) => {
        return r === null ? 1 : r.missionNames;
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

  addMissionChoices: (_id, missionNames) => {
    Result.updateOne(
      { _id },
      {
        missionNames,
      }
    ).exec();
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

  getAcceptanceVotes: (_id) => {
    return Result.findOne({ _id }).select({
      playerTurn: 1,
      round: 1,
      votesForMission: 1,
      selectedNames: 1,
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

  deleteLastRound: (_id, round, playersList) => {
    round++;
    return Result.findOne({ _id })
      .select("votesForMission")
      .then((r) => {
        const pt = r.votesForMission
          .filter((r) => r.round === round)
          .reduce((p, n) => (p.playerTurn < n.playerTurn ? p : n));

        const length = playersList.length;
        const pos = pt.playerTurn % length;
        Result.updateOne(
          { _id },
          {
            $pop: { voteResultList: 1, votersList: 1, selectedNames: 1 },
            round: round,
            $pull: { votesForMission: { round: round } },
            playerTurn: pt.playerTurn,
            playerToChoose: playersList[pos],
          }
        ).exec();
      });
  },

  deleteLastVoteFormission: (_id, playerTurn, round, playersList) => {
    const length = playersList.length;
    const pos = (playerTurn % length) - 1;
    Result.updateOne(
      { _id },
      {
        $pull: {
          votesForMission: { playerTurn: playerTurn, round },
        },
        playerTurn: playerTurn,
        playerToChoose: playersList[pos],
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
