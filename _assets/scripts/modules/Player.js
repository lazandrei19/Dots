var colorUtils = require('./colorUtils');

module.exports = (function(){
	var maxPlayers;


	function Player(max) {
		this.maxPlayers = max - 1;
		this.currentPlayer = 0;
		this.colors = [];
		for(var i = 0; i <= this.maxPlayers;) {
			var c = colorUtils.randomColor();
			if(colorUtils.compareDeltas(c, this.colors, 10)) {
				this.colors.push(c);
				i++;
			}
		}
	}

	Player.prototype.nextPlayer = function () {
		if(this.currentPlayer === this.maxPlayers) {
			this.currentPlayer = 0;
		} else {
			this.currentPlayer += 1;
		}
	}

	Player.prototype.getCurrentPlayer = function () {
		return this.currentPlayer;
	}

	Player.prototype.getMaxPlayers = function () {
		return this.maxPlayers + 1;
	}

	Player.prototype.getCurrentColor = function () {
		return this.colors[this.currentPlayer];
	}

	Player.prototype.getAllColors = function () {
		return this.colors;
	}

	return Player;
})();