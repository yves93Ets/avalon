const shuffle = require("../utilities");

let names = [];

function addUser(n) {
  names.push(n);
}

function removeUser(value) {
  names = names.filter((n) => {
    return n !== value;
  });
}

function getUserNames() {
  return names;
}

function getNumUsers() {
  return names.length;
}

function shuffleNames() {
  names = shuffle(names);
}

function emptyUsersList() {
  names = [];
}

module.exports = {
  addUser,
  removeUser,
  getUserNames,
  getNumUsers,
  shuffleNames,
  emptyUsersList,
};
