var chalk = require('chalk');
module.exports = function(config) {
	console.log('message cfg', config);
	var style;
	switch(config.type) {
		case 'success':
			style = 'green';
		break;
		case 'error':
			style = 'red';
		break;
		default:
			style = 'default';
		break;
	}
	return function() {
		console.log(chalk[style](config.text));
		return config.type!=='error';
	}
}