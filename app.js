var http = require('http');
var child_process = require('child_process');

var white = process.argv[2] == "w";

function evaluate(fen) {
  console.log("cogitating...");
  var output = child_process.execSync("node test \"" + fen + "\"", { encoding: "utf8" });
  var matches = /bestmove ([a-z][0-9][a-z][0-9])/.exec(output);
  var move = matches[1];
  console.log("suggested move:", move);
  return {
    from: move[0] + move[1],
    to: move[2] + move[3]
  };
}

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'origin, content-type'});
  console.log("incoming");
  if (req.method == 'POST') {
    var body = '';
    req.on('data', function (data) {
      body += data;
      
      // Too much POST data, kill the connection!
      if (body.length > 1e6)
        req.connection.destroy();
    });
    req.on('end', function () {
      var post = JSON.parse(body);
	  var move = post.move;
	  if (!move) return res.end("{}");
	  var isWhiteMove = move.ply % 2 == 0;
	  var fen = move.fen + (white ? " w" : " b");
	  console.log("fen", fen);
	  if ((!isWhiteMove || white) && (isWhiteMove || !white)) {
	    var move = evaluate(fen);
	    res.end(JSON.stringify(move));
	  } else res.end("{}");
    });
  } else res.end("");
}).listen(1334, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1334/');
