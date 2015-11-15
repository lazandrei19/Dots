module.exports.inRange = function (n, step, range, max) {
	for (var i = 0; i*step <= max; i++) {
		if(n >= i*step - range && n <= i*step + range) {
			return i;
		}
	};
	return false;
}