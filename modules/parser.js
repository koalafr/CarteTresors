const {
  mapToken,
  mountainToken,
  treasureToken,
  playerToken,
  dataDelim,
} = require("../utils/tokens.js");

// helpers

function lineSplitter(dataLine) {
  const dataArray = dataLine.split(dataDelim);
  dataArray.shift();
  return dataArray;
}

function parseIntArray(stringArray) {
  const intArray = stringArray.map((stringNumber) => {
    return parseInt(stringNumber);
  });
  return intArray;
}

// parse the map
function parseMap(mapInput) {
  // width, height
  const mapInfo = lineSplitter(mapInput);
  const newMap = {
    tiles: [],
    width: parseInt(mapInfo[0]),
    height: parseInt(mapInfo[1]),
  };
  for (let i = 0; i < newMap.height; i++) {
    const mapSlice = new Array(newMap.width);
    mapSlice.fill(0);
    newMap.tiles.push(mapSlice);
  }
  return newMap;
}

// parse the mountains
function parseMountain(mountainInput) {
  // horizontal, vertical
  const mountainRawInfo = lineSplitter(mountainInput);
  return parseIntArray(mountainRawInfo);
}

// parse the treasures
function parseTreasure(treasureInput, treasureId) {
  // horizontal, vertical, qty, id
  const treasureRawInfo = lineSplitter(treasureInput);
  const treasureInfo = parseIntArray(treasureRawInfo);
  const newTreasure = {
    id: treasureId,
    x: treasureInfo[0],
    y: treasureInfo[1],
    qty: treasureInfo[2],
  };
  return newTreasure;
}

// parse the players
function parsePlayer(playerInput, playerId) {
  // name, horizontal, vertical, orientation, moves
  // playerId is move order
  const playerRawInfo = lineSplitter(playerInput);
  const newPlayer = {
    id: playerId,
    name: playerRawInfo[0],
    x: parseInt(playerRawInfo[1]),
    y: parseInt(playerRawInfo[2]),
    looking: playerRawInfo[3],
    moves: playerRawInfo[4].split(""),
    justLooted: -1,
    loot: 0,
  };
  return newPlayer;
}

// parse the game
function gameParser(inputMap) {
  const lineDelim = "\n";

  let playerId = 1;
  let treasureId = 0;

  const parsedGame = {
    map: null,
    mountains: [],
    treasures: [],
    players: [],
  };

  const inputLines = inputMap.split(lineDelim);
  inputLines.forEach((line) => {
    switch (line[0]) {
      case mapToken:
        const newMap = parseMap(line);
        parsedGame.map = newMap;
        break;
      case mountainToken:
        const mountainPos = parseMountain(line);
        parsedGame.mountains.push(mountainPos);
        break;
      case treasureToken:
        const treasure = parseTreasure(line, treasureId);
        parsedGame.treasures.push(treasure);
        treasureId = treasureId + 1;
        break;
      case playerToken:
        const player = parsePlayer(line, playerId);
        parsedGame.players.push(player);
        playerId = playerId + 1;
        break;
      // ignore comments
    }
  });
  // could check for map existence here
  return parsedGame;
}

module.exports = gameParser;
