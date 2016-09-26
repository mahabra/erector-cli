var isPromise = require('./isPromise.js');
var path = require('path');
var FileRef = require('./FileRef');

function Workflow(cli) {
	this.cli = cli;
}

Workflow.prototype = {
	constructor: Workflow,
	run: function(subject, args) {
		if ("string"===typeof subject) {
			return this.cli.usePackage(subject, args);
		} else if (isPromise(subject)) {
			var promise = subject
			.then(this.run.bind(this));
			promise.catch(this.run.bind(this));
			return promise;
		} else if ("function"===typeof subject) {
			return Promise.resolve(this.run(subject.apply(this, args||[])));
		} else if ("boolean"===typeof subject) {
			if (subject) {
				console.log('Mission complete'.green);
			} else {
				console.log('Aborted'.red);
			}
			process.exit(0);
		} else if (subject instanceof Error) {
			console.log('Aborted by error'.red);
			throw subject;
		} else if (subject===null) {
			process.exit(0);
		} else {
			console.log('Unexpected result'.red, subject);
			Promise.resolve(false);
		}
	},
	touch: function(relatedFile) {
		var realFilename = path.resolve(this.cli.process.cwd(), relatedFile);
		return new FileRef(realFilename);
	}
}

module.exports = Workflow;