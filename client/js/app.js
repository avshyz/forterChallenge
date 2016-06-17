// App
var app = angular.module('app', ['ngAnimate', 'ngAria', 'ngMaterial']);
var sock = io();

// App controller
app.controller('appController', ['$scope', function ($scope) {
    // TODO
    // 1. bot
    // 2. online users
    // 3. restyle

    $scope.log = [];

    sock.on('auth', function(data) {
        console.log(data);
        $scope.id = data.id;
    });

    sock.on('received', function(data) {
        console.log(data);
        $scope.log.push(data);
        $scope.$apply()
    });

    $scope.send = function () {
        sock.emit('send', {
            author: $scope.id,
            msg: $scope.message
        });
    };
}]);