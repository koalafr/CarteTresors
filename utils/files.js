const fs = require("node:fs");

// open a file
function openFile(inputFilePath) {
  try {
    const data = fs.readFileSync(inputFilePath, "utf8");
    return data;
  } catch (error) {
    // could log error
    console.error("Error: Map file not found");
  }
}

function writeToFile(gameOutput) {
  try {
    fs.writeFileSync("./game.result", gameOutput);
    console.log("Game saved to 'game.result', thanks for playing !");
  } catch (err) {
    console.error(err);
  }
}

module.exports = { openFile, writeToFile };
