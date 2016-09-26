var spawn = require('cross-spawn');
var util = require('util');
var path = require('path');

function ensurePackage() {
	try {
	    var packageJson = require(require.resolve(this.touch('package.json').fullname));
	} catch (e) {
		console.log('Starting creating package JSON');
	  	var peers = [],
	  	output = spawn.sync("npm", ["init"], {
	      stdio: ["ignore", "pipe", "inherit"]
	    });
	}
	return true;
}

module.exports = function() {
	return ensurePackage;
}