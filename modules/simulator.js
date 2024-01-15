const placer = require("../utils/utils.js");

// helpers

function getLongestRun(players) {
  let longestRun = 0;
  players.forEach((player) => {
    const playerRun = player.moves.length;
    if (playerRun > longestRun) {
      longestRun = playerRun;
    }
  });
  return longestRun;
}

function isOutOfBounds(nextTile, map) {
  if (
    nextTile.x >= map.width ||
    nextTile.y >= map.height ||
    nextTile.x < 0 ||
    nextTile.y < 0
  ) {
    return true;
  }
  return false;
}

// apply movement
function doMove(nextTile, game, player) {
  // check bounds
  if (isOutOfBounds(nextTile, game.map)) {
    return;
  }
  // check tile
  const tile = game.map.tiles[nextTile.y][nextTile.x];
  // null -> obstacle - do nothing
  if (tile !== null) {
    if (typeof tile === "number") {
      // >0 -> other player - do nothing
      if (tile === 0) {
        // free tile - move
        // update player pos - map
        movePlayer(nextTile, game, player, null);
      }
    } else {
      // treasure - move and pickup
      movePlayer(nextTile, game, player, tile);
    }
  }
}

// loot helper

function getTreasureById(treasures, id) {
  return treasures.find((element) => element.id === id);
}

function getTreasureIndexById(treasures, id) {
  let found = -1;
  treasures.forEach((element, index) => {
    if (element.id === id) {
      found = index;
    }
  });
  return found;
}

// pickup loot - return mustRemoveTreasureCache
function pickupTreasure(player, treasure) {
  player.loot = player.loot + 1;
  treasure.qty = treasure.qty - 1;
  if (treasure.qty > 0) {
    player.justLooted = treasure.id;
    return false;
  }
  // if none left delete spot
  return true;
}

// leave some loot
function replaceTreasure(game, player) {
  const treasure = getTreasureById(game.treasures, player.justLooted);
  player.justLooted = -1;
  placer(game.map.tiles, player.x, player.y, treasure);
}

// delete loot spot
function removeTreasureCache(treasures, emptyCache) {
  const found = getTreasureIndexById(treasures, emptyCache.id);
  if (found >= 0) {
    treasures.splice(found, 1);
  }
}

// player commands

// calc move
function calcPlayerMove(player) {
  const nextPos = {
    x: player.x,
    y: player.y,
  };
  switch (player.looking) {
    case "N":
      // go up
      nextPos.y = nextPos.y - 1;
      break;
    case "S":
      // go down
      nextPos.y = nextPos.y + 1;
      break;
    case "E":
      // go right
      nextPos.x = nextPos.x + 1;
      break;
    case "O":
      // go left
      nextPos.x = nextPos.x - 1;
      break;
  }
  return nextPos;
}

// move
function movePlayer(nextTile, game, player, treasure) {
  // free map space or replace treasure
  if (player.justLooted >= 0) {
    replaceTreasure(game, player);
  } else {
    placer(game.map.tiles, player.x, player.y, 0);
  }

  if (treasure) {
    const mustRemoveTreasureCache = pickupTreasure(player, treasure);
    if (mustRemoveTreasureCache) {
      removeTreasureCache(game.treasures, treasure);
    }
  }

  // update player pos
  player.x = nextTile.x;
  player.y = nextTile.y;
  // update map
  placer(game.map.tiles, player.x, player.y, player.id);
}

// rotate
function rotatePlayerLeft(player) {
  switch (player.looking) {
    case "N":
      player.looking = "O";
      break;
    case "S":
      player.looking = "E";
      break;
    case "E":
      player.looking = "N";
      break;
    case "O":
      player.looking = "S";
      break;
  }
}

function rotatePlayerRight(player) {
  switch (player.looking) {
    case "N":
      player.looking = "E";
      break;
    case "S":
      player.looking = "O";
      break;
    case "E":
      player.looking = "S";
      break;
    case "O":
      player.looking = "N";
      break;
  }
}

// simulate step
function doPlayerAction(game, player) {
  if (player.moves.length === 0) {
    // done
    return;
  }
  // do action
  switch (player.moves[0]) {
    case "A":
      // calc move
      const nextTile = calcPlayerMove(player);
      // check next tile and apply to game
      doMove(nextTile, game, player);
      break;
    case "G":
      // rotate left 90°
      // apply to player
      rotatePlayerLeft(player);
      break;
    case "D":
      // rotate right 90°
      // apply to player
      rotatePlayerRight(player);
      break;
  }
  player.moves.shift();
}

// simulate game
function gameSimulator(game) {
  const longestRun = getLongestRun(game.players);
  // Simulate runs
  for (let index = 0; index < longestRun; index++) {
    game.players.forEach((player) => {
      doPlayerAction(game, player);
    });
  }
  return game;
}

module.exports = gameSimulator;
