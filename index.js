#! /usr/bin/env node
// -*- js -*-
"use strict";
var npmPackageExpr = /^[a-z0-9\-_]+$/i;
var Cli = require('./lib/Cli.js');
var cli = new Cli(process);
var andron;
for (var i=2;i<process.argv.length;++i) {
	var packageName = npmPackageExpr.exec(process.argv[i]) ? 'dron-'+process.argv[i] : process.argv[i];
	cli.usePackage(packageName);
}
