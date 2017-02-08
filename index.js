#! /usr/bin/env node
// -*- js -*-
"use strict";
const fs = require('fs');
const path = require('path');
const erector = require(process.env.DEV ? "./../erector/erector.js" : "erector");
const args = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const isFileSync = require('./lib/isFileSync.js');
const searchInLocalErector = require('./lib/searchInLocalErector.js');
const inspector = require('./inspector');

function echoError(message, stack) {
  console.log(chalk.bgYellow.black.bold(' ERROR :P ') + ' ' + chalk.inverse(' '+message));
  let hint = inspector(message, stack);
  console.log(hint ? hint : chalk.dim(stack.substr(stack.indexOf(message)+message.length)));
}

const app = erector();
app.use(erector.pwd(process.env.PWD || process.cwd()));
const filename = path.resolve(process.cwd(), process.argv[2]);
let result;
if (isFileSync(filename)) {
  result = app.run(filename, args);
} else {
  if (!/[\.]/.test(process.argv[2])) {
    result = app.runPackage(process.argv[2], args, {
      autoinstall: false
    })
    .catch(function(e) {
      return (e.type === erector.constants.ERR_UNDEFINED_PACKAGE)
      ? searchInLocalErector(process.argv[2])
      .then(function(fullname) {
        return app.run(fullname, args);
      }) : Promise.reject(e);
    });
  } else {
    result = Promise.reject(new Error('Module "'+filename+'" not found'));
  }
}

result
.catch(function(e) {
  echoError(e.message, e.stack);
});
