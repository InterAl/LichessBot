var http = require('http');
var child_process = require('child_process');
var toFen = require('./toFen').default;

var isWhite = process.argv[2] == "w";

function evaluate(fen) {
    console.log("cogitating...", fen);
    var output = child_process.execSync("node stockfish-query \"" + fen + "\"", { encoding: "utf8" });
    var matches = /bestmove ([a-z][0-9][a-z][0-9])/.exec(output);
    var move = matches[1];
    return {
        from: move[0] + move[1],
        to: move[2] + move[3]
    };
}

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'origin, content-type', 'Access-Control-Allow-Methods': 'OPTIONS, POST'});

    if ( req.method === 'OPTIONS' ) {
        res.end();
        return;
    }

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
            var fen = toFen(post.pieces);
            fen += ' ' + post.activeTurn;

            if (post.activeTurn === post.playerColor) {
                var move = evaluate(fen);
                res.end(JSON.stringify(move));
            } else
                res.end("{}");
        });
    } else
        res.end("");
}).listen(1334, '127.0.0.1', function () {
    console.log('Server running at http://127.0.0.1:1334/');
});
