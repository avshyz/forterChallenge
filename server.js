var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 3000;

app.use(express.static(__dirname + '/client'));
app.set('views', __dirname + '/client/templates');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

require('./server/routes.js')(app);


io.on('connection', function (socket) {
    console.log('a user connected');
});


//app.listen(port);
server.listen(3000, function(){
  console.log('listening on *:3000');
});

console.log("Web server listening on port " + port);
