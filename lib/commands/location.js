const path = require('path');
const resolveModuleLocation = require('/Users/morulus/Work/morulus/projects/erector-node-utils/resolveModuleLocation');
const log = require('../log.js');

module.exports = function(args) {
  const moduleName = args._[1];
  if (!moduleName) {
    log('Module name must be specified');
    process.exit(0);
  }
  resolveModuleLocation(moduleName, process.cwd())
  .then(function(location) {
    // -d: display directory of module
    log(args.d ? path.dirname(location) : location);
  });
}
