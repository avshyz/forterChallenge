var utils = require('./utils');

module.exports = function (io) {
    io.on('connection', function (socket) {
        var id = utils.getUniqId();
        socket.emit('auth', {id: id});
        console.log(id + ' connected');

        socket.on('send', function (data) {
            console.log(data);
            io.sockets.emit('received', data);
        });
    });
};