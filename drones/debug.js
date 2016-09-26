var chalk = require('chalk');
module.exports = function(argv) {
	return function() {
		if (argv._[1]) {
			console.log(chalk.magenta('Debugging ', argv._[1]));
			var packageFullpath = this.cli.requirePackage(argv._[1], {
				returnErrors: true,
				justResolve: true
			});
			console.log(chalk.magenta('Package found in '), chalk.gray(packageFullpath));
			return true;
		} else {
			return this.run('message', {
				text: 'No package for debugging. Use `dron debug your-package-name`',
				type: 'error'
			});
		}
	}
}