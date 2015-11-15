var config = require('./config');

module.exports = function(opts) {
	var { hDots, vDots } = opts;
	var w = window.innerWidth - config.padding; //window width without padding
	var h = window.innerHeight - config.padding; //window height without padding
	var min = Math.min(w, h); //smallest window dimension. further calculations based on this
	var d = Math.min(min / Math.max(hDots, vDots), config.maxDistance); // distance between dots // might need some tweaking
	var canvasW = (hDots - 1) * d; //final canvas width
	var canvasH = (vDots - 1) * d; //final canvas height
	var c = document.createElement('canvas'); //canvas creation
	c.setAttribute('id', 'canvas'); //sets canvas id
	c.setAttribute('width', (canvasW + 6) + 'px'); //sets canvas width
	c.setAttribute('height', (canvasH + 6) + 'px'); //sets canvas height
	document.getElementById('body').appendChild(c); //adds canvas to DOM
	opts.d = d;
};