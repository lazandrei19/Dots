var CanvasHelper = require('./CanvasHelper');
var Player = require('./Player');
var player;
var canvas = new CanvasHelper('canvas');
var functions = require('./functions');
var hLines = [];
var vLines = [];
var squares = [];

module.exports = function(opts) {
	drawGrid(opts);
	canvas.attachListener(function({offsetX, offsetY}) {
		var x = offsetX - 3; //Normalizes click position for X
		var y = offsetY - 3; //Normalizes click position for Y
		var {d, vDots, hDots} = opts; //Gets number of dots and distance between them
		var type, posX, posY; //declares variables as public
		if(functions.inRange(x, d, opts.config.accuracy, d * hDots) !== false) { //if the event was v, the touch was on a column 
			type = 'v';
			posX = functions.inRange(x, d, opts.config.accuracy, d * hDots);
			posY = Math.floor(y / d);
		} else if(functions.inRange(y, d, opts.config.accuracy, d * vDots) !== false) { //if the event was h, the touch was on a row 
			type = 'h';
			posX = Math.floor(x / d);
			posY = functions.inRange(y, d, opts.config.accuracy, d * vDots);
		}
		if(posX !== undefined && posY !== undefined && type !== undefined) {
			clicked({x: posX, y: posY, type, opts}); //launches function
		}
	});
	init(opts);
};

function init({hDots, vDots, players}) {
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
	player = new Player(players);
}

function clicked({x, y, type, opts}) {
	drawLine(type, x, y, opts);
	switch(type) {
		case 'v':
			vLines[x][y] = 1;
			break;
		case 'h':
			hLines[x][y] = 1;
			break;
	}
	var won = checkSquares({x, y, type, opts, player: player.getCurrentPlayer()});
	if(won.length > 0) {
		for (var i = 0; i < won.length; i++) {
			squares[won[i].x][won[i].y] = player.getCurrentPlayer();
			drawSquare(won[i].x, won[i].y, player.getCurrentColor(), opts);
		};
	} else {
		player.nextPlayer();
	}
}

function drawSquare(x, y, color, {hDots, vDots, d}) {
	canvas.drawRect({
		fillStyle: `rgb(${color.r}, ${color.g}, ${color.b})`,
		left: 3 + (x * d),
		top: 3 + (y * d),
		width: d,
		height: d
	});
	drawLines({hDots, vDots, d});
}

function checkSquares({x, y, type, opts, player}) {
	var squares = [];
	switch(type) {
		case 'h': 			//TODO:FIX OVERFLOW
			if(y > 0) {
				if(	hLines[x][y-1] === 1 && 
					vLines[x][y-1] === 1 && 
					vLines[x+1][y-1] === 1) {

						squares.push({x, y: y-1});
				}
			}
			if(	hLines[x][y+1] === 1 && 
				vLines[x][y] === 1 && 
				vLines[x+1][y] === 1) {

				squares.push({x, y});
			}
			break;
		case 'v':
			if(x > 0) {
				if(	vLines[x-1][y] === 1 && 
					hLines[x-1][y] === 1 && 
					hLines[x-1][y+1] === 1) {

					squares.push({x: x-1, y});
				}
			}
			if(	vLines[x+1][y] === 1 && 
				hLines[x][y] === 1 && 
				hLines[x][y+1] === 1) {

				squares.push({x, y});
			}
			break;
	}
	return squares;
}

function drawLines({hDots, vDots, d}) {
	for (var i = 0; i < hDots; ++i) {
		for(var j = 0; j < vDots - 1; ++j) {
			if(vLines[i][j] !== 0) {
				drawLine('v', i, j, {d});
			}
		}
	}
	for (var i = 0; i < vDots; ++i) {
		for(var j = 0; j < hDots - 1; ++j) {
			if(hLines[i][j] !== 0) {
				drawLine('h', i, j, {d});
			}
		}
	}
	drawGrid({hDots, vDots, d});
}

function drawLine(type, x, y, opts) {
	var {d} = opts;
	switch(type){
		case 'h':
			canvas.drawRect({
				fillStyle: 'black',
				left: 3 + (x * d),
				top: 1 + (y * d),
				width: d,
				height: 4
			});
			break;
		case 'v':
			canvas.drawRect({
				fillStyle: 'black',
				top: 3 + (y * d),
				left: 1 + (x * d),
				height: d,
				width: 4
			});
			break;
	}
}

function drawGrid({hDots, vDots, d}) {
	for (var i = 0; i < hDots; i++) {
		for (var j = 0; j < vDots; j++) {
			canvas.drawCircle({
				fillStyle: 'black',
				radius: 3,
				top: 3 + d * j,
				left: 3 + d * i
			});
		};
	};
}

module.exports.drawLines = drawLines;