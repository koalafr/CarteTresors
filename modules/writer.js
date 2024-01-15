const {
  mapToken,
  mountainToken,
  treasureToken,
  playerToken,
  dataDelim,
} = require("../utils/tokens.js");
const { writeToFile } = require("../utils/files.js");

function writeMap(map) {
  return `${mapToken}${dataDelim}${map.width}${dataDelim}${map.height}\n`;
}

function writeMountains(mountains) {
  let mountainsString = "";
  mountains.forEach((mountain) => {
    mountainsString += `${mountainToken}${dataDelim}${mountain[0]}`;
    mountainsString += `${dataDelim}${mountain[1]}\n`;
  });
  return mountainsString;
}

function writeTreasures(treasures) {
  let treasuresString = "";
  treasures.forEach((treasure) => {
    treasuresString += `${treasureToken}${dataDelim}${treasure.x}${dataDelim}`;
    treasuresString += `${treasure.y}${dataDelim}${treasure.qty}\n`;
  });
  return treasuresString;
}

function writePlayers(players) {
  let playersString = "";
  players.forEach((player) => {
    playersString += `${playerToken}${dataDelim}${player.name}${dataDelim}`;
    playersString += `${player.x}${dataDelim}${player.y}${dataDelim}`;
    playersString += `${player.looking}${dataDelim}${player.loot}\n`;
  });
  return playersString;
}

function writeGameOut(game) {
  let gameOutput = "";

  gameOutput += writeMap(game.map);
  gameOutput += writeMountains(game.mountains);
  gameOutput += writeTreasures(game.treasures);
  gameOutput += writePlayers(game.players);

  writeToFile(gameOutput);
}

module.exports = writeGameOut;
