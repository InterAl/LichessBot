var stockfish = require("stockfish")();
var i = require("util").inspect;

stockfish.postMessage("position fen " + process.argv[2]);
stockfish.postMessage("go depth 12");

stockfish.onmessage = function (event) {
	console.log(event.data ? event.data : event);
};