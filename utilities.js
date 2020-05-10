function shuffle(arr) {
  return arr
    .map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);
}

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const setFinishTime = () => {
  const now = new Date();
  const min = now.getUTCMinutes();
  const finishesAt = new Date().setMinutes(min + 10);
  return finishesAt;
};

const getSecondsLeft = (time) => {
  const now = new Date();
  const utcSeconds = time.getTime() - now.getTime();
  const seconds = utcSeconds / 1000;

  return seconds > 0 ? seconds : 0;
};

const convertToMultipleArray = (array, round) => {
  const arr = [];
  for (j = 1; j <= round + 1; j++) {
    const newArr = array
      .filter((a) => {
        return a.round == j;
      })
      .sort((a, b) => {
        return a.vote - b.vote;
      })
      .sort((a, b) => {
        return a.playerTurn > b.playerTurn ? 1 : -1;
      });

    if (newArr.length > 0) {
      arr.push(newArr);
    }
  }
  return arr;
};

module.exports = {
  shuffle,
  capitalize,
  setFinishTime,
  getSecondsLeft,
  convertToMultipleArray,
};
