const array = [
  { username: "yves", charactere: "Mordred" },
  { username: "serge", charactere: "Percival" },
  { username: "david", charactere: "Morgana" },
  { username: "val", charactere: "Merlin" },
  { username: "Marley", charactere: "Good" },
];

function RolesCreator(charactere, username) {
  this.charactere = charactere;
  this.username = username;
  this.group = getGroup(this.charactere);
  this.knowledge = [];
}

function create(charactere, username) {
  return new RolesCreator(charactere, username);
}

function setKnowledge(group, characteresArray) {
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
        if (a.charactere === "merlin" || a.charactere === "morgana") {
          knowledge.push(a.username);
        }
      });
      break;
    default:
  }
  return knowledge;
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
