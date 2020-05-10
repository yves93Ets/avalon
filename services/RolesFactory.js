function RolesCreator(charactere, username) {
  this.charactere = {
    name: charactere.name.toLowerCase(),
    description: charactere.description,
  };
  this.username = username;
  this.group = getGroup(this.charactere.name);
  this.knowledge = [];
}

function create(charactere, username) {
  return new RolesCreator(charactere, username);
}

function setKnowledge(group, username, characteresArray) {
  const knowledge = [];
  switch (group) {
    case "mordred":
      characteresArray.map((a) => {
        if (group === a.group) {
          knowledge.push(a.username);
        }
      });
      break;
    case "merlin":
      characteresArray.map((a) => {
        if (
          (a.group === "mordred" && a.charactere !== "mordred") ||
          a.group === "oberon"
        ) {
          knowledge.push(a.username);
        }
      });
      break;
    case "percival":
      characteresArray.map((a) => {
        if (a.charactere.name === "merlin" || a.charactere.name === "morgana") {
          knowledge.push(a.username);
        }
      });
      break;
    default:
  }

  return knowledge.filter((k) => {
    return k !== username;
  });
}

function getGroup(charactereName) {
  let group;
  switch (charactereName) {
    case "mordred":
    case "assassin":
    case "morgana":
    case "minion of mordred 1":
    case "minion of mordred 2":
    case "minion of mordred 3":
      group = "mordred";
      break;
    case "merlin":
      group = "merlin";
      break;
    case "percival":
      group = "percival";
      break;
    case "oberon":
      group = "oberon";
      break;
    default:
      group = "default";
  }
  return group;
}

function verifyRoles(cArray, lgList) {
  let sameCount = 0;
  cArray.map((c) => {
    lgList.map((l) => {
      l.charactere == c.charactere && l.username == c.username
        ? sameCount++
        : sameCount;
    });
  });

  return sameCount > 2 ? true : false;
}

module.exports = { create, setKnowledge, verifyRoles };
