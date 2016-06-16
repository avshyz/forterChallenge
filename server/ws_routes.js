var utils = require('./utils');

module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('a user connected');
        socket.emit('auth', {id: utils.getUniqId()});
    });
};