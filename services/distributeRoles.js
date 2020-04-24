const shuffle = require("../utilities");
const RolesFactory = require("./RolesFactory");
const distributeRoles = (names, roles) => {
  names = ["David", "Yves", "Serge"];

  const array = shuffle(roles).map((r, index) => {
    return { charactere: r, username: names[index] };
  });
  var characteresArray = [];
  array.map((a) => {
    characteresArray.push(
      RolesFactory.create(a.charactere.toLowerCase(), a.username)
    );
  });

  characteresArray.map((c) => {
    c.knowledge = RolesFactory.setKnowledge(c.group, characteresArray);
  });
  return characteresArray;
};

module.exports = distributeRoles;
