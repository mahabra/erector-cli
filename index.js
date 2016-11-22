#! /usr/bin/env node
// -*- js -*-
"use strict";
const path = require('path');
const dron = require(process.env.DEV?"./../dron/index.js":"dron");
const args = require('minimist')(process.argv.slice(2));

dron.runFile(path.resolve(process.cwd(), process.argv[2]), args)
.then(function(result) {
  console.log('Completed');
})
.catch(function(e) {
  console.log('Error', e.message, e.stack);
});
