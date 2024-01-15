const process = require("node:process");
const path = require("node:path");

const defaultMapPath = "./maps/default.map";

const { openFile } = require("./utils/files.js");
const playGame = require("./modules/play.js");

// read
function readFileOrDefault() {
  const inputFileName = process.argv[2];

  if (inputFileName) {
    const inputFilePath = path.join(__dirname, inputFileName);
    return openFile(inputFilePath);
  }
  return openFile(defaultMapPath);
}

function main() {
  // read
  const inputMap = readFileOrDefault();
  if (!inputMap) {
    console.error("Error: Reading map");
    return;
  }
  playGame(inputMap);
}

main();
