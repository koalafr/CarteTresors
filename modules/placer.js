const placer = require("../utils/utils.js");

// place the mountains
function placeMountains(tiles, mountains) {
  // horizontal, vertical
  mountains.forEach((mountain) => {
    const hpos = mountain[0];
    const vpos = mountain[1];
    placer(tiles, hpos, vpos, null);
  });
}

// place the treasures
function placeTreasures(tiles, treasures) {
  // horizontal, vertical, qty, id
  treasures.forEach((treasure) => {
    placer(tiles, treasure.x, treasure.y, treasure);
  });
}

// place the players
function placePlayers(tiles, players) {
  players.forEach((player) => {
    placer(tiles, player.x, player.y, player.id);
  });
}

function gamePlacer(parsedGame) {
  placeMountains(parsedGame.map.tiles, parsedGame.mountains);
  placeTreasures(parsedGame.map.tiles, parsedGame.treasures);
  placePlayers(parsedGame.map.tiles, parsedGame.players);
  return parsedGame;
}

module.exports = gamePlacer;
