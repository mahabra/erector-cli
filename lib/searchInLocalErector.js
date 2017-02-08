const path = require('path');
const findParentDir = require('find-parent-dir');

module.exports = function searchInLocalErector() {
  return new Promise(function(resolve, reject) {
    findParentDir(process.cwd(), '__erector__', function (err, dir) {
      if (err) {
        reject(err);
      } else {
        const fileName = path.join(dir, '__erector__', process.argv[2]);
        try {
          const inlinePackageIndex = require.resolve(path.join(dir, '__erector__', process.argv[2]));
          resolve(inlinePackageIndex);
        } catch(e) {
          reject(e);
        }
      }
    });
  });
}
