var functions = require('./functions');

module.exports.randomColor = function() {
	return {
		r: functions.getRandomInt(0, 256),
		g: functions.getRandomInt(0, 256),
		b: functions.getRandomInt(0, 256),
	}
};

module.exports.getDelta = function({r: r1, g: g1, b: b1}, {r: r2, b: b2, g: g2}) {
	return Math.sqrt((r2-r1)^2+(g2-g1)^2+(b2-b1)^2);
};

module.exports.compareDeltas = function(color, against, threshold) {
	for (var i = against.length - 1; i >= 0; i--) {
		if(this.getDelta(color, against[i]) < threshold) {
			return false;
		}
	};
	return true;
};