const test = require("node:test");
const assert = require("node:assert");
const testMapPath = "./maps/test.map";

const { openFile } = require("./utils/files.js");
const playGame = require("./modules/play.js");

test("should return the correct completed game", (t) => {
  const expected = "C - 3 - 4\nM - 0 - 2\nA - Indiana - 0 - 3 - N - 0\n";
  const input = openFile(testMapPath);
  playGame(input);
  const result = openFile("./game.result");
  assert.strictEqual(expected, result);
});
