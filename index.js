#! /usr/bin/env node
// -*- js -*-
"use strict";
const fs = require('fs');
const path = require('path');
const erector = require("./../erector/dist/app.js");
const args = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const resolvePackage = require('erector-node-utils/resolvePackage');
const isFileSync = require('erector-node-utils/isFileSync');
const sideeffects = require('./lib/sideeffects.js');
const middlewares = require('./lib/middlewares.js');
const executeSystemCommand = require('./lib/helpers/executeSystemCommand.js');
const searchInLocalErector = require('./lib/searchInLocalErector.js');
const inspector = require('./inspector');

function echoError(e) {
  const message = e.message;
  const stack = e.stack;
  console.log(chalk.bgYellow.black.bold('Erector caught'+e.name)
    + "\n\n"
    + chalk.bgYellow.black.bold('Location:') + ' ' + chalk.inverse(' '+message));
  let hint = inspector(message, stack);
  console.log(hint ? hint : chalk.dim(stack.substr(stack.indexOf(message)+message.length)));
  process.exit(0);
}

const app = erector();
app.use(erector.pwd(process.env.PWD || process.cwd()));
app.use(erector.sideeffect(sideeffects))
app.use(erector.middleware(middlewares))
Promise.resolve(process.argv[2])
.then(executeSystemCommand)
.catch(function(payload) {
  if (payload instanceof Error) {
    throw payload;
  }
  const resourceName = path.resolve(process.cwd(), payload);
  let result;

  if (isFileSync(resourceName)) {
    result = app.run(resourceName, args);
  } else {
    if (!/[\.]/.test(process.argv[2])) {
      // e.type === erector.constants.ERR_UNDEFINED_PACKAGE
      result = resolvePackage(process.argv[2], {
        before: function(shortName) {
          return searchInLocalErector(process.cwd(), shortName)
        }
      }).then(function(filename) {
        return app.run(filename, args, {
          autoinstall: false
        });
      });
    } else {
      result = Promise.reject(new Error('Module "'+filename+'" not found'));
    }
  }
  return result;
})
.catch(function(e) {
  echoError(e);
});
