const spawn = require('cross-spawn');
const stream = require('stream');

module.exports = function preInstallPackage(packageName) {
	const writable = new stream.Writable({
	  write: function(chunk, encoding, next) {
	    next();
	  }
	});
	const result = spawn.sync('npm', ['install', packageName, '-g'], Object.assign({
			stdio: ['inherit', 'inherit', "inherit"]
		}, {}));
	const response = result.stderr.toString('utf8');

	if (~response.indexOf('Registry returned 404')) {
		console.log(chalk.red('Package `'+packageName+'` is not found or corrupt'));
		return false;
	} else {
		console.log(response);
		return true;
	}
}
