"use strict";
const chalk = require('chalk');

function hightlightJs(code) {
  code = code.replace(/([{}]+)/g, chalk.yellow('$1'));
  code = code.replace(/("[^"]+")/g, chalk.yellow('$1'));
  code = code.replace(/(function|class |var |let )/g, chalk.yellow('$1'));
  return code;
}

const commonProblems = [
  {
    detection: /^(assignReducer|assignState|confirm|dialog|dispatch|echo|exit|fileExists|map|readFile|readJson|run|spawn|transform|writeFile|writeFileSafe||writeJson) is not defined$/,
    conclusion: function(signature, stack) {
      let badFileExpr = /at ([a-z0-9\.\$_\(\)\[\] ]*) \(([\/\\\-[a-z0-9\.\$_ ]+):[0-9]+:[0-9]+\)/i;
      let badFile = badFileExpr.exec(stack);
      return chalk.yellow('! ')+chalk.gray("It seems you have forgotten to import dron operator "+chalk.inverse(signature)+". ")+
      "\n\n"+chalk.bold.yellow('Hint')+'\n'+
      "Paste the import instruction to the beginning of the file "+chalk.yellow("("+badFile+")" ? badFile[2] : "No file")+":\n\n"+
      chalk.bgWhite.black(' 1 ')+' '+hightlightJs('import { assignReducer } from "dron";')+
      "\n";
    }
  }
]

module.exports = function(message, stack) {
  let solutions = commonProblems.map(function(problem) {
    if (problem.detection instanceof RegExp) {
      if (problem.detection.test(message)) {
        return problem.conclusion(problem.detection.exec(message)[1], stack);
      } else {
        return false;
      }
    } else if ("function"===typeof problem.detection) {
      let signature = problem.detection(message, stack);
      return signature ? problem.conclusion(signature) : false;
    } else {
      return false;
    }
  }).filter(function(item) {
    return item!==false;
  });
  if (solutions.length>0) {
    return solutions[0];
  } else {
    return 'Unknown error';
  }
}
