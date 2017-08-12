const path = require('path');
const requireg = require('requireg');
const npmErectModuleExpr = /^erector-[a-z0-9\-_]+$/i;
const preInstallPackage = require('./preInstallPackage.js');

module.exports = function autoinstallPackage(shortName, resolvePackage) {
  const packageName = !npmErectModuleExpr.exec(dpn) ? 'erector-'+dpn : dpn;
  if (preInstallPackage(packageName)) {
    return resolvePackage(dpn);
  } else {
    throw new Error('Package `'+dpn+'` is not exists');
  }
}
