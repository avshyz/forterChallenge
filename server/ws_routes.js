var utils = require('./utils');
var Hal = require('./hal_bot');

module.exports = function (io) {
    var bot = new Hal();
    var onlineUsers = [];

    io.on('connection', function (socket) {
        var id = utils.getUniqId();
        socket.id = id;
        socket.emit('auth', {id: id, onlineUsers: onlineUsers});
        socket.broadcast.emit('user_connected', {id: id});
        onlineUsers.push(id);

        console.log(id + ' connected');

        socket.on('send', function (data) {
            io.sockets.emit('received', data);
            var bot_response = bot.evesdrop(data.msg);
            if (bot_response) {
                io.sockets.emit('received', bot_response)
            }
        });

        socket.on('disconnect', function () {
            socket.broadcast.emit('user_disconnected', {id: id});
            console.log(id + ' disconnected');
            onlineUsers.splice(onlineUsers.indexOf(id), 1);
        });
    });
};