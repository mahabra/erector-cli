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
const cutArgsCommands = require('./lib/helpers/cutArgsCommands.js');
const resolveModuleLocation = require('../erector-node-utils/resolveModuleLocation.js');
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
app.use(erector.middleware(middlewares));
Promise.resolve([args._[0], args])
.then(executeSystemCommand)
.catch(function(payload) {
  if (payload instanceof Error) {
    throw payload;
  }
  return resolveModuleLocation(payload[0], process.cwd(), {
    paths: [path.resolve(__dirname, '../erector-base-scripts')],
  })
  .then(function(filename) {
    return app.run(filename, cutArgsCommands(args), {
      autoinstall: false
    });
  });
})
.catch(function(e) {
  echoError(e);
});
