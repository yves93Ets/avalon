const shuffle = require("../utilities");

//const names = ["yves", "serge", "david", "Val", "my", "Jack"];
//const roles = ["Mordred", "Merlin", "Assassin", "good 1", "good 2", "Morgana"];
//console.log(suffle(names));
//console.log(suffle(names));

const distributeRoles = (names, roles) => {
  shuffle(roles);
  shuffle(names);
  console.log(shuffle(names));
  console.log(shuffle(roles));
};

module.exports = distributeRoles;
