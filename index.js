#! /usr/bin/env node
// -*- js -*-
"use strict";
const fs = require('fs');
const path = require('path');
const erector = require(process.env.DEV ? "./../erector/erector.js" : "erector");
const args = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const inspector = require('./inspector');
const findParentDir = require('find-parent-dir');

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

function searchInLocalErector() {
  return new Promise(function(resolve, reject) {
    findParentDir(process.cwd(), '__erector__', function (err, dir) {
      if (err) {
        reject(err);
      } else {
        const filename = path.join(dir, '__erector__', process.argv[2]+'.js');
        if (localFileExists(filename)) {
          resolve(filename);
        } else {
          reject();
        }
      }
    });
  });
}

const app = erector();
app.use(erector.pwd(process.env.PWD || process.cwd()));
const filename = path.resolve(process.cwd(), process.argv[2]);
let result;
if (localFileExists(filename)) {
  result = app.run(filename, args);
} else {
  if (!/[\.]/.test(process.argv[2])) {
    result = app.runPackage(process.argv[2], args, {
      autoinstall: false
    })
    .catch(function() {
      return searchInLocalErector(process.argv[2])
      .then(function(fullname) {
        return app.run(fullname, args);
      });
    });
  } else {
    result = Promise.reject(new Error('Module "'+filename+'" not found'));
  }
}

result
.catch(function(e) {
  echoError(e.message, e.stack);
});
