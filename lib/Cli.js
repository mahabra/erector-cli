var path = require('path');
var requireg = require('requireg');
var Workflow = require('./Workflow.js');
var chalk = require('chalk');
var npmPackageExpr = require('./exprs.js').npmPackageExpr;

var slashrize= function(url) {
	url=url.replace(/\\/g, "/").replace('//', '/');
	if (url.substr(-1)!=='/') url+='/';
	return url;
}

var drones = {
	ensurePackage: require('./../drones/ensurePackage.js'),
	installNpmPackages: require('./../drones/installNpmPackages.js'),
	confirm: require('./../drones/confirm.js'),
	message: require('./../drones/message.js'),
	debug: require('./../drones/debug.js'),
	prompt: require('./../drones/prompt.js')
}

function Cli(process, argv) {
	console.log(chalk.yellow('    *'));
	console.log('   _|_');
	console.log(('|_(')+chalk.blue('o')+' '+chalk.blue('o')+')_|');
	console.log(('  | @ |'));
	console.log(('   ---'));

	this.config = {
		showErrors: !!argv['show-errors']
	};
	this.process = process;
}

Cli.prototype = {
	constructor: Cli,
	usePackage: function(packageName, argv) {

		var dron = this.requirePackage(packageName);
		if (!dron) {
			console.log(('Please, run command `npm i '+packageName+' -g`').green);
		} else {
			try {
				var workflow = new Workflow(this);
				return workflow.run(dron, argv);
			} catch(e) {
				if (this.config.showErrors){
					throw e;
				} else {
					console.log(chalk.red('Package '+packageName+' has runtime errors. Run `dron '+packageName+' --show-errors` for ditails.'));
				}
			}
		}
	},
	requirePackage: function(moduleName, forceConfig) {
		var config = "object"===typeof forceConfig ? Object.assign({}, this.config, forceConfig) : this.config;
		if (drones.hasOwnProperty(moduleName)) {
			return config.justResolve ? ':memory:' : drones[moduleName];
		}

		var packageName = npmPackageExpr.exec(moduleName) ? 'dron-'+moduleName : moduleName;

		try { 
			return config.justResolve ? require.resolve(packageName) : require(packageName);
		} catch(e) {
			try {
				if (e.code=='MODULE_NOT_FOUND') {
					var localPath = path.join(process.cwd(), 'node_modules', packageName);
					var resolvePath = require.resolve(localPath);
					return config.justResolve ? resolvePath : require(resolvePath);
				} else {
					console.log(chalk.red('Error'), e);
				}
			} catch(e) {
				if (e.code=='MODULE_NOT_FOUND') {
					try {
						return config.justResolve ? requireg.resolve(packageName) : requireg(packageName);
					} catch(e) {
						if (e.code=='MODULE_NOT_FOUND') {
							console.log(chalk.blue('Package '+packageName+' is missed...'));
							return false;
						} else {
							var shortPackageName = (packageName.split('/').pop());
							console.log(chalk.red('Package '+shortPackageName+' has an errors. Run `dron debug '+packageName+'` to find a problem.'));
							if (config.showErrors) {
								throw e;
							}
							process.exit(0);
						}
						
					}
				} else {
					console.log('Error'.red, e);
				}
			}
			
		}
	}
}

module.exports = Cli;