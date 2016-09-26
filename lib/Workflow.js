var isPromise = require('./isPromise.js');
var path = require('path');
var FileRef = require('./FileRef');
var chalk = require('chalk');

function Workflow(cli) {
	this.cli = cli;
	this.runCounts = 0;
}

Workflow.prototype = {
	constructor: Workflow,
	run: function(subject, args) {
		return Promise.resolve(subject).then(function(subject) {
			//process.stdout.write('.');
			if ("string"===typeof subject) {
				return this.cli.usePackage(subject, args);
			} else if (isPromise(subject)) {
				var promise = subject
				.then(this.run.bind(this));
				promise.catch(this.run.bind(this));
				return promise;
			} else if ("function"===typeof subject) {
				return this.run(subject.call(this, args));
			} else if ("boolean"===typeof subject) {
				if (subject) {
					return Promise.resolve(true);
				} else {
					return Promise.resolve(false);
				}
				process.exit(0);
			} else if (subject instanceof Error) {
				console.log(chalk.red('Aborted by error'), e);
				throw subject;
			} else if (subject===null) {
				console.log(chalk.red('Aborted by null'));
				process.exit(0);
			} else {
				return Promise.resolve(subject);
			}
		}.bind(this));
	},
	touch: function(relatedFile) {
		var realFilename = path.resolve(this.cli.process.cwd(), relatedFile);
		return new FileRef(realFilename);
	}
}

module.exports = Workflow;