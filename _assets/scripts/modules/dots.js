var CanvasHelper = require('./CanvasHelper');
var canvas = new CanvasHelper('canvas');
var functions = require('./functions');
var hLines = [];
var vLines = [];
var squares = [];

function clog(a) {
	console.log(a);
}

module.exports = function(opts) {
	drawGrid(opts);
	canvas.attachListener(function({offsetX, offsetY}) {
		var x = offsetX - 3;
		var y = offsetY - 3;
		var {d, vDots, hDots} = opts;
		var type, posX, posY;
		if(functions.inRange(x, d, opts.config.accuracy, d * hDots) !== false) {
			type = 'v';
			posX = functions.inRange(x, d, opts.config.accuracy, d * hDots);
			posY = Math.floor(y / d);
		} else if(functions.inRange(y, d, opts.config.accuracy, d * vDots) !== false) {
			type = 'h';
			posX = Math.floor(x / d);
			posY = functions.inRange(y, d, opts.config.accuracy, d * vDots);
		}
		clicked({x: posX, y: posY, type});
	});
	init(opts);
};

function init({hDots, vDots}) {
	for (var i = 0; i < hDots; ++i) {
		var c = [];
		for(var j = 0; j < vDots - 1; ++j) {
			c.push(0);
		}
		vLines.push(c);
	}
	for (var i = 0; i < vDots; ++i) {
		var c = [];
		for(var j = 0; j < hDots - 1; ++j) {
			c.push(0);
		}
		hLines.push(c);
	}
	for (var i = 0; i < hDots - 1; ++i) {
		var c = [];
		for(var j = 0; j < vDots - 1; ++j) {
			c.push(0);
		}
		squares.push(c);
	}
}

function clicked({x, y, type}) {
	
}

function drawGrid({hDots, vDots, d}) {
	for (var i = 0; i < hDots; i++) {
		for (var j = 0; j < vDots; j++) {
			canvas.drawCircle({
				fill: 'black',
				radius: 3,
				top: 3 + d * j,
				left: 3 + d * i
			});
		};
	};
}