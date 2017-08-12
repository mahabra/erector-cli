module.exports = function runPackage(handler) {
  options = Object.assign({
    autoinstall: true
  }, options);
  let file;
  try {
    file = resolvePackage(packageName, {
      before: resolveSystemScripts,
      after: options.autoinstall ? autoinstallPackage : false,
    });
  } catch(e) {
    file = false;
  } finally {
    if (file&&!(file instanceof Error)) {
      return this.run(file, props);
    }
  }
  const error = new Error("Undefined package");
  error.type = ERR_UNDEFINED_PACKAGE;
  return Promise.reject(error);
}
