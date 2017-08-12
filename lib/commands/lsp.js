const log = require('../log.js');
const searchLocalErectorDisposition = require('erector-node-utils/searchLocalErectorDisposition.js');

module.exports = function srcs() {
  return searchLocalErectorDirectories(process.cwd())
  .then(function(paths) {
    if (paths.length) {
      log(paths.join("\n"));
    } else {
      log('No local scripts found');
    }
  });
}
