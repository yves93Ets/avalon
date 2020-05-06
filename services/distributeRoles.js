const { shuffle } = require("../utilities");
const RolesFactory = require("./RolesFactory");
const distributeRoles = (names, roles, lastGameList) => {
  let matches = true;
  let count = 0;
  while (matches) {
    names = shuffle(names);
    const array = shuffle(roles).map((r, index) => {
      return { charactere: r, username: names[index] };
    });
    var characteresArray = [];
    array.map((a) => {
      characteresArray.push(
        RolesFactory.create(a.charactere.toLowerCase(), a.username)
      );
    });

    matches = RolesFactory.verifyRoles(characteresArray, lastGameList);
    count++;
    if (count > 5) {
      break;
    }
  }
  characteresArray.map((c) => {
    c.knowledge = RolesFactory.setKnowledge(
      c.group,
      c.username,
      characteresArray
    );
  });
  return characteresArray;
};

module.exports = distributeRoles;
