const rimrafDir = require("@lerna/rimraf-dir");
const pulseTillDone = require("@lerna/pulse-till-done");

module.exports = function cleanDocs(directoriesToDelete) {
  if (!directoriesToDelete || !Array.isArray(directoriesToDelete)) {
    console.log(`Nothing to clean`);
    return;
  }

  console.log(`Begin cleaning directories`);
  directoriesToDelete.map(async dirPath => {
    await pulseTillDone(rimrafDir(dirPath).then(() => console.log(`Cleaned: ${dirPath}`)));
    console.log(`Finished cleaning directories`);
  });
};
