var chalk = require('chalk');
var spawn = require('cross-spawn');
module.exports = function(argv) {
	return function() {
		if (argv._[1]) {
			console.log(chalk.magenta('Debugging ', argv._[1]));
			var packageFullpath = this.cli.requirePackage(argv._[1], {
				returnErrors: true,
				justResolve: true
			});
			console.log(chalk.magenta('Package found in '), chalk.gray(packageFullpath));
			output = spawn.sync("node", [packageFullpath], {
		      stdio: [process.stdin, process.stdout, "inherit"]
		    });
			return true;
		} else {
			return this.run('message', {
				text: 'No package for debugging. Use `dron debug your-package-name`',
				type: 'error'
			});
		}
	}
}