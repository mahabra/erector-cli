const path = require('path');
const fs = require('fs');
const findParentDir = require('find-parent-dir');
const searchLocalErectorDisposition = require('erector-node-utils/searchLocalErectorDisposition');
const getErectorScriptNamesInDirectory = require('erector-node-utils/getErectorScriptNamesInDirectory');
const isDirSync = require('erector-node-utils/isDirSync.js');
const log = require('../log.js');

module.exports = function ls() {
  return searchLocalErectorDisposition(process.cwd())
  .then(function(dirs) {
    let result = [];
    dirs.forEach(function(dirName) {
      result = result.concat(getErectorScriptNamesInDirectory(dirName));
    });
    return result;
  })
  .then(function(scripts) {
    log(scripts.join(' '));
    return true;
  });
}
