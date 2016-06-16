var express = require('express');
var stylus = require('stylus');
var nib = require('nib');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 3000;

app.set('views', __dirname + '/client/templates');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.use(stylus.middleware({
    src: __dirname + '/client',
    compile: function (str, path) {
        return stylus(str)
            .set('filename', path)
            .use(nib())
    }
}));
app.use(express.static(__dirname + '/client'));


require('./server/routes.js')(app);
require('./server/ws_routes')(io);

server.listen(3000, function () {
    console.log('listening on *:3000');
});

console.log("Web server listening on port " + port);
