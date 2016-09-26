var fs = require('fs');

function retFalse() {
	return false;
}

function Unexisten() {

}

Unexisten.prototype = {
	constructor: Unexisten,
	isFile: retFalse
}

function FileRef(fullname) {
	this.fullname = fullname;
	try {
		this.stats = fs.statSync(fullname);
	} catch(e) {
		this.stats = new Unexisten(fullname);
	}
}

FileRef.prototype = {
	constructor: FileRef,
	exists: function() {
		return this.stats.isFile();
	},
	read: function() {
		return this.exists() ? fs.readFileSync(this.fullname, 'utf-8') : '';
	},
	write: function(content) {
		return fs.writeFileSync(this.fullname, content, 'utf-8');
	}
}

module.exports = FileRef;