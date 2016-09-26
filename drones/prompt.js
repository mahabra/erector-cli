var inquirer = require('inquirer');

module.exports = function(config) {
	return function() {
		return inquirer.prompt(config.questions).then(function (answers) {
			return answers;
		});
	}
}