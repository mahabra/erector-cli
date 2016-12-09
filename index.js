#! /usr/bin/env node
// -*- js -*-
"use strict";
const fs = require('fs');
const path = require('path');
const dron = require(process.env.DEV?"./../erector/index.js":"erector");
const args = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const inspector = require('./inspector');

function echoError(message, stack) {
  console.log(chalk.bgYellow.black.bold(' ERROR :P ') + ' ' + chalk.inverse(' '+message+' '));
  let hint = inspector(message, stack);

  console.log(hint ? hint : chalk.dim(stack.substr(stack.indexOf(message)+message.length)));
}

function localFileExists(filename) {
  try {
    let stats = fs.lstatSync(filename);
    return !stats.isDirectory();
  }
  catch (e) {
      return false;
  }
}

let runner;
const filename = path.resolve(process.cwd(), process.argv[2]);
if (localFileExists(filename)) {
  runner = dron.runModule(filename, args, process.env);
} else {
  runner = dron.runPackage(process.argv[2], args, process.env);
}

runner
.then(function(result) {
  console.log('Completed');
})
.catch(function(e) {
  echoError(e.message, e.stack);
});
