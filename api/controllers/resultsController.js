const Result = require("../models/resultsModel");
const { shuffle } = require("../../utilities");
const uuid = require("uuid");
module.exports = {
  createResult: () => {
    const newResult = {
      round: 1,
      expires: new Date().getTime(),
      _id: uuid.v1(),
    };
    return Result.insertMany(newResult)
      .then((r) => {
        return r;
      })
      .catch((e) => console.log("error", e));
  },

  addResults: (votes, voters, round, _id) => {
    Result.updateOne(
      { _id },
      {
        $push: { votersList: voters, voteResultList: votes },
        round,
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
  deleteLastResult: (_id) => {
    Result.updateOne(
      { _id },
      { $pop: { voteResultList: 1, votersList: 1 } }
    ).exec();
  },
};
