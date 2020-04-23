const shuffle = require("../utilities");

const distributeRoles = (names, roles) => {
  const array = shuffle(roles).map((r, index) => {
    return { charactere: r, username: names[index] };
  });

  var characteresArray = [];
  array.map((a) => {
    characteresArray.push(create(a.charactere.toLowerCase(), a.username));
  });

  characteresArray.map((c) => {
    var a = (c.knowledge = setKnowledge(c.group, characteresArray));
  });
};

module.exports = distributeRoles;
