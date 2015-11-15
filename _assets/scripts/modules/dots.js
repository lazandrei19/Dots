var CanvasHelper = require('./CanvasHelper');
var canvas = new CanvasHelper('canvas');
var functions = require('./functions');
var hLines, vLines, squares;

module.exports = function(opts) {
	drawGrid(opts);
	canvas.attachListener(function({offsetX, offsetY}) {
        clicked({x: offsetX - 3, y: offsetY - 3, opts});
	});
	init(opts);
};

function init({hDots, vDots}) {

}

function clicked({x, y, opts}) {
	var {d, vDots, hDots} = opts;
	
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