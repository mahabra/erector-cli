var spawn = require('cross-spawn');
var util = require('util');
var path = require('path');
var chalk = require('chalk');

function ensurePackage() {
	return function() {
		var correct = true,
		packageJson;
		try {
		    packageJson = require(require.resolve(this.touch('package.json').fullname));
		} catch (e) {
			correct = false;
		}

		if ("object"!==typeof packageJson) {
			correct = false;
		}

		return new Promise(function(resolve, reject) {
			if (correct) {
				console.log(chalk.gray('Package.json exists'));
				resolve(packageJson);
			} else {
			  	var peers = [],
			  	output = spawn.sync("npm", ["init"], {
			      stdio: [process.stdin, process.stdout, "inherit"]
			    });
			    try {
			    	var newPackageJson = require(require.resolve(this.touch('package.json').fullname));
			    	console.log(chalk.green('Package.json successfully created'));
			    	resolve(newPackageJson);
			    } catch(e) {
			    	resolve(false);
			    }
			}
		}.bind(this));
	}
}

module.exports = function() {
	return ensurePackage;
}