const Result = require("../models/resultsModel");
const { shuffle } = require("../../utilities");
const uuid = require("uuid");
module.exports = {
  createResult: (finishesAt) => {
    const newResult = {
      round: 1,
      expires: new Date().getTime(),
      _id: uuid.v1(),
      finishesAt,
    };
    return Result.insertMany(newResult)
      .then((r) => {
        return r;
      })
      .catch((e) => console.log("error", e));
  },

  addResults: (votes, voters, round, finishesAt, _id) => {
    Result.updateOne(
      { _id },
      {
        $push: { votersList: voters, voteResultList: votes },
        round,
        finishesAt,
        plaplayerTurn: 1,
      }
    ).exec();
  },

  addVotesFormMission: (username, vote, _id) => {
    Result.updateOne(
      { _id },
      {
        $push: { votesForMission: { username, vote } },
      }
    ).exec();
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
    return Result.updateOne(
      { _id },
      { $pop: { voteResultList: 1, votersList: 1 }, round }
    ).exec();
  },

  deleteRound: (_id, round) => {
    Result.updateOne(
      { _id },
      {
        $unset: {
          "voteResultList.$[element]": 1,
          "votersList.$[element]": 1,
        },
      },
      {
        arrayFilters: [{ element: round }],
        upsert: true,
      }
    )
      .exec()
      .then((r) => {
        console.log(r);
      });

    /*Result.updateOne(
      { _id },
      { $pull: { voteResultList: null, votersList: null } }
    ).exec();*/
  },
};
