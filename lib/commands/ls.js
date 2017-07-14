const path = require('path');
const fs = require('fs');
const findParentDir = require('find-parent-dir');
const searchLocalErectorDirectories = require('../helpers/searchLocalErectorDirectories.js');
const getErectorScriptNamesInDirectory = require('../helpers/getErectorScriptNamesInDirectory.js');
const log = require('../log.js');
const isDirSync = require('../helpers/isDirSync.js');

module.exports = function ls() {
  return searchLocalErectorDirectories(process.cwd())
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
