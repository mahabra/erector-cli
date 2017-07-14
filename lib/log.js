const chalk = require('chalk');

module.exports = function log() {
  const messages = Array.prototype.slice.call(arguments);
  console.log.apply(console, messages.map(function(message) {
    return chalk.yellow(message);
  }));
}
