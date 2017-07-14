const path = require('path');
const findParentDir = require('find-parent-dir');
const isDirSync = require('./helpers/isDirSync.js');

function searchModuleInFolder(dir, moduleName) {
  return new Promise(function(resolve, reject) {
    const fileName = path.join(dir, moduleName);
    try {
      const inlinePackageIndex = require.resolve(fileName);
      resolve(inlinePackageIndex);
    } catch (e) {
      searchInLocalErector(path.resolve(dir, '../../'), moduleName)
      .then(resolve)
      .catch(reject);
    }
  });
}

function searchInLocalErector(cwd, moduleName) {
  return new Promise(function(resolve, reject) {
    // Search in current dir
    const inCurrentDir = path.join(cwd, '__erector__');
    if (isDirSync(inCurrentDir)) {
      searchModuleInFolder(inCurrentDir, moduleName)
      .then(resolve)
      .catch(reject);
    } else {
      findParentDir(cwd, '__erector__', function (err, dir) {
        if (err) {
          reject(err);
        } else {
          if (dir) {
            searchModuleInFolder(path.join(dir, '__erector__'), moduleName)
            .then(resolve)
            .catch(reject);
          } else {
            reject(new Error('Not found in '+cwd));
          }
        }
      });
    }
  });
}

module.exports = searchInLocalErector;
