const ls = require('./../commands/ls.js');
const lsp = require('./../commands/lsp.js');
const location = require('./../commands/location.js');
const create = require('./../commands/create.js');
const init = require('./../commands/init.js');

module.exports = function executeSystemCommand(payload) {
  const command = payload[0];
  const args = payload[1];
  switch (command) {
    case 'ls':
      return ls();
    case 'lsp':
      return lsp();
    break;
    case 'loc':
      return location(args);
    break;
    // case 'create':
    //   return create();
    // break;
    case 'init':
      return init();
    break;
    default:
      return Promise.reject(payload);
    break;
  }
}
