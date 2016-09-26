var spawn = require('cross-spawn');
var util = require('util');
var _ = require('lodash');
module.exports = function(packageNames, args) {
	return function() {
		var argsPairs = _.toPairs(args||{}).map(function(v, key) {
			return key+("string"===typeof v ? (' '+v) : '');
		}).join(' ');
		output = spawn.sync("npm", (["install"]).concat(packageNames).concat(argsPairs), {
	      stdio: ["ignore", "pipe", "inherit"]
	    });
		return true;
	}
}