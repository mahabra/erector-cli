const resolvePackage = require("./../../../erector/dist/app.js").resolvePackage;
const path = require('path');
const isFileSync = require('./isFileSync.js');
const isDirSync = require('./isDirSync.js');
const searchLocalErectorDirectories = require('./searchLocalErectorDirectories.js');

module.exports = function resolveModuleLocation(moduleName, cwd) {
  return Promise.resolve()
  .then(function() {
    const localFile = path.resolve(cwd, moduleName);
    if (isFileSync(localFile)) {
      resolve(localFile);
    } else {
      return searchLocalErectorDirectories(cwd)
      .then(function(dirs) {
        for (let i = 0; i < dirs.length; i++) {
          const filename = path.join(dirs[i], moduleName);
          const indexedFolderFilename = path.join(filename, 'index.js');
          const filenameJs = filename + '.js';
          if (isDirSync(filename) && isFileSync(indexedFolderFilename)) {
            return indexedFolderFilename;
          } else if (isFileSync(filenameJs)) {
            return filenameJs;
          }
        }
        return Promise.reject();
      })
      .catch(function() {
        const location = resolvePackage(moduleName, true);
        if (location instanceof Error) {
          return location.message;
        }
        return location;
      });
    }
  })
}
