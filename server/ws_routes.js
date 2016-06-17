var utils = require('./utils');
var Hal = require('./hal_bot');

module.exports = function (io) {
    var bot = new Hal();

    io.on('connection', function (socket) {
        var id = utils.getUniqId();
        socket.emit('auth', {id: id});
        console.log(id + ' connected');

        socket.on('send', function (data) {
            io.sockets.emit('received', data);
            var bot_response = bot.evesdrop(data.msg);
            if (bot_response) {
                io.sockets.emit('received', {
                    author: 'HAL BOT',
                    msg: bot_response
                })
            }
        });
    });
};