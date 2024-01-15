const gameParser = require("./parser.js");
const gamePlacer = require("./placer.js");
const gameSimulator = require("./simulator.js");
const writeGameOut = require("./writer.js");

function playGame(inputMap) {
  // parser
  const parsedGame = gameParser(inputMap);
  // placer
  const readyGame = gamePlacer(parsedGame);
  // simulator
  const doneGame = gameSimulator(readyGame);
  // writer
  writeGameOut(doneGame);
}

module.exports = playGame;
