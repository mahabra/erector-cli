const resolveModuleLocation = require('erector-node-utils/resolveModuleLocation');
const log = require('../log.js');

module.exports = function() {
  const moduleName = process.argv[3];
  if (!moduleName) {
    log('Module name must be specified');
    process.exit(0);
  }
  resolveModuleLocation(moduleName, process.cwd())
  .then(function(location) {
    log(location);
  });
}
