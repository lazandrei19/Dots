var config = require('./modules/config');
var opts = {hDots: 4, vDots: 4, config, players: 2};
var init = require('./modules/init')(opts);
var engine = require('./modules/dots')(opts);