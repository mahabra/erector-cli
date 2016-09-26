#! /usr/bin/env node
// -*- js -*-
"use strict";

var Cli = require('./lib/Cli.js');
var chalk = require('chalk');
var npmPackageExpr = require('./lib/exprs.js').npmPackageExpr;
var argv = require('minimist')(process.argv.slice(2));
var cli = new Cli(process, argv);
console.log(chalk.blue('Executes'),chalk.blue.bold(process.argv[2]), chalk.blue('dron'));
cli.usePackage(process.argv[2], argv)
.then(function(result) {
	console.log(result ? chalk.green('Mission complete') : chalk.red('Mission aborted', result));
})
.catch(function(e) {
	if (argv['show-errors']) {
		console.log(chalk.red('Package '+process.argv[2]+' has an errors'), e);
		throw e;
	} else {
		console.log(chalk.red('Package '+process.argv[2]+' has an errors. Run `dron debug '+process.argv[2]+'` to find a problem.'));
	}
});


