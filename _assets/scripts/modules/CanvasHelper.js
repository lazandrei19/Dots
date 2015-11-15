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

	CanvasHelper.prototype.drawRect = function({left, top, width: w, height: h, fillStyle: fill}) {
		this.ctx.fillStyle = fill;
		this.ctx.fillRect(left, top, w, h);
	};

	CanvasHelper.prototype.drawCircle = function ({left, top, radius, fillStyle: fill}) {
		this.ctx.fillStyle = fill;
		this.ctx.beginPath();
		this.ctx.arc(left, top, radius, 0, Math.PI*2);
		this.ctx.fill();
	}

	CanvasHelper.prototype.attachListener = function (cb) {
		this.canvas.addEventListener('click', cb, false);
	}

	return CanvasHelper;
})();