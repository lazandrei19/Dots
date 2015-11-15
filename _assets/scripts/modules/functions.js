module.exports.inRange = function (n, step, range, max) {
	for (var i = 0; i*step <= max; i++) {
		if(n >= i*step - range && n <= i*step + range) {
			return i;
		}
	};
	return false;
}

module.exports.getRandom = function(min, max) {
  return Math.random() * (max - min) + min;
}

module.exports.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}