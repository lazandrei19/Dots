module.exports = (function(){
	var maxPlayers;
	var currentPlayer = 0;


	function Player (max) {
		this.maxPlayers = max - 1;
	}

	Player.prototype.nextPlayer = function () {
		if(this.currentPlayer = this.maxPlayers) {
			this.currentPlayer = 0;
		} else {
			this.currentPlayer++;
		}
	}

	Player.prototype.getCurrentPlayer = function () {
		return this.currentPlayer;
	}

	Player.prototype.getMaxPlayers = function () {
		return ++this.maxPlayers;
	}

	return Player;
})();