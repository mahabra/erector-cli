const DIALOG = require('./../../erector').constants.DIALOG;
const inquirer = require('inquirer');

module.exports = function middlewares(store) {
  return function(next) {
    return function(action) {
      switch(action.type) {
        case DIALOG:
          return inquirer.prompt(action.questions).then(function (answers) {
            return action.single ? answers.question : answers;
          });
        break;
        default:
          next(action);
        break;
      }
    }
  }
}
