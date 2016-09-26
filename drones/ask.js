  var prompt = require('prompt');
module.exports = function(config) {
	return function() {
		return new Promise(function(resolve, reject) {
			prompt.start();
			  // 
			  // Get two properties from the user: username and password 
			  // 
			prompt.get([{
			      name: 'confirmation',
			      message: config.question + '(yes/no)',
			      required: true
			    }], function (err, result) {
			    	if (err) {
			    		resolve(false);
			    	} else {
			    		resolve(result.confirmation.toLowerCase()==='yes');
			    	}
			    	
			});
		});
		
	}
}