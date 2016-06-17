// App
var app = angular.module('app', ['ngAnimate', 'ngAria', 'ngMaterial']);
var sock = io();

// App controller
app.controller('appController', ['$scope', function ($scope) {
    // TODO
    // refactor styles


    $scope.log = [];
    $scope.uniqColors = {};

    sock.on('auth', function (data) {
        console.log(data);
        $scope.id = data.id;
        $scope.onlineUsers = data.onlineUsers;
        $scope.uniqColors = _.reduce($scope.onlineUsers, function(res, item) {
            res[item] = $scope.pick();
            return res;
        }, {});
        console.log($scope.onlineUsers);
        $scope.$apply();
    });

    sock.on('user_connected', function (data) {
        $scope.onlineUsers.push(data.id);
        $scope.uniqColors[data.id] = $scope.pick();
        $scope.$apply();
    });

    sock.on('user_disconnected', function (data) {
        $scope.onlineUsers.splice($scope.onlineUsers.indexOf(data.id), 1);
        delete $scope.uniqColors[data.id];
        $scope.$apply();
    });

    sock.on('received', function (data) {
        console.log(data);
        $scope.log.push(data);
        $scope.$apply()
    });

    $scope.send = function () {
        sock.emit('send', {
            author: $scope.id,
            msg: $scope.message,
            human: true
        });
        $scope.message = '';
    };

    $scope.pick = function () {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };
}]);