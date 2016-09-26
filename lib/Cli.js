require('colors');
var path = require('path');
var requireg = require('requireg');
var Workflow = require('./Workflow.js');

var slashrize= function(url) {
	url=url.replace(/\\/g, "/").replace('//', '/');
	if (url.substr(-1)!=='/') url+='/';
	return url;
}

var drones = {
	ensurePackage: require('./../drones/ensurePackage.js'),
	installNpmPackages: require('./../drones/installNpmPackages.js'),
	ask: require('./../drones/ask.js')
}

function Cli(process) {
	console.log('  ___'.blue);
	console.log('\\(o o)/'.blue);
	console.log(' | ^ |'.blue);
	this.process = process;
}

Cli.prototype = {
	constructor: Cli,
	usePackage: function(packageName, args) {
		var dron = this.requirePackage(packageName);
		if (!dron) {
			console.log(('Please, run command `npm i '+packageName+' -g`').green);
		} else {
			try {
				var workflow = new Workflow(this);
				return workflow.run(dron, args);
				// var anDrone = new Dron(this.process);
				// anDrone.awake()
				// .then(function() {
				// 	console.log('Mission complete'.green);
				// })
				// .catch(function(e) {
				// 	console.log('Mission fail'.red);
				// });
			} catch(e) {
				console.log('Dron '+packageName+' has errors');
				throw e;
			}
		}
	},
	requirePackage: function(packageName) {
		if (drones.hasOwnProperty(packageName)) {
			return drones[packageName];
		}

		try { 
			return require(packageName);
		} catch(e) {
			try {
				//console.log(('Npm package '+packageName+' missed...'));
				var localPath = path.join(process.cwd(), 'node_modules', packageName);
				var resolvePath = require.resolve(localPath);
				return require(resolvePath);
			} catch(e) {
				//console.log(('node_modules/'+packageName+' missed...').blue);
				try {
					return requireg(packageName);
				} catch(e) {
					console.log(('Package '+packageName+' is missed...').blue);
					return false;
				}
			}
			
		}
	}
}

module.exports = Cli;