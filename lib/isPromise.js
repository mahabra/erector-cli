module.exports = function isPromise(o) {
	return "object"===typeof o&&"function"===typeof o.then&&"function"===typeof o['catch'];
}