module.exports = (function(){
	var canvas;
	var ctx;
	function CanvasHelper (canvasID) {
		this.canvas = document.getElementById(canvasID);
		this.ctx = this.canvas.getContext('2d');
	}

	CanvasHelper.prototype.getCanvas = function () {
		return this.canvas;
	}

	CanvasHelper.prototype.getContext = function () {
		return this.ctx;
	}

	CanvasHelper.prototype.drawRect = function(options) {
		this.ctx.fillStyle = options.fillStyle;
		this.ctx.fillRect(options.left, options.top, options.width, options.height);
	};

	CanvasHelper.prototype.drawCircle = function (options) {
		this.ctx.fillStyle = options.fillStyle;
		this.ctx.beginPath();
		this.ctx.arc(options.left,options.top,options.radius,0,Math.PI*2);
		this.ctx.fill();
	}

	CanvasHelper.prototype.attachListener = function (cb) {
		this.canvas.addEventListener('click', cb, false);
	}

	return CanvasHelper;
})();