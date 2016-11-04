#! /usr/bin/env node
// -*- js -*-
"use strict";

const Dron = require('dron/Dron');//require('./../dron/Dron');
const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));
const cli = new Dron(process, argv);
/**
 * Convert argv keys to camelCase
 */
function camelize(txt) {
	return txt.replace(/-([\da-z])/gi, function( all, letter ) {
		return letter.toUpperCase();
	});
};

var camelCasedArgv = {};
for (let prop in argv) {
	if (argv.hasOwnProperty(prop)&&prop!=='_') {
		camelCasedArgv[camelize(prop)] = argv[prop];
	}
}

/**
 * Save origin props names until ver. 0.2.0
 */
Object.assign(argv, camelCasedArgv);

cli.usePackage(process.argv[2], argv)
.then(function(result) {
	console.log(result ? chalk.green('OK') : chalk.red('Mission aborted', result));
})
.catch(function(e) {
	if (argv['displayErrors']) {
		console.log(chalk.red('Package '+process.argv[2]+' has an errors'), e.message, e.stack);
		throw e;
	} else {
		console.log(chalk.red('Package '+process.argv[2]+' has an errors. Run `dron debug '+process.argv[2]+'` to find a problem.'));
	}
});
