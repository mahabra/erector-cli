#! /usr/bin/env node
// -*- js -*-
"use strict";
const fs = require('fs');
const path = require('path');
const erector = require(process.env.DEV ? "./../erector/erector.js" : "erector");
const args = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const inspector = require('./inspector');

function echoError(message, stack) {
  console.log(chalk.bgYellow.black.bold(' ERROR :P ') + ' ' + chalk.inverse(' '+message));
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

const app = erector();
app.use(erector.pwd(process.env.PWD || process.cwd()));
const filename = path.resolve(process.cwd(), process.argv[2]);
let result;
if (localFileExists(filename)) {
  result = app.run(filename, args);
} else {
  if (process.argv[2].substr(0,8) === 'erector-') {
    result = app.runPackage(process.argv[2], args);
  } else {
    result = Promise.reject(new Error('Module "'+process.argv[2]+'" not found'));
  }
}

result
.catch(function(e) {
  echoError(e.message, e.stack);
});
