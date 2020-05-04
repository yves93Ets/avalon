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
  return seconds;
};

module.exports = { shuffle, capitalize, setFinishTime, getSecondsLeft };
