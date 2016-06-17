// App
var app = angular.module('app', ['ngAnimate', 'ngAria', 'ngMaterial']);
var sock = io();

// App controller
app.controller('appController', ['$scope', function ($scope) {
    // TODO
    // 3. restyle
    // 4. sockio service - automatic $applyt

    $scope.log = [];

    sock.on('auth', function(data) {
        console.log(data);
        $scope.id = data.id;
        $scope.onlineUsers = data.onlineUsers;
        console.log($scope.onlineUsers);

        $scope.$apply();
    });

    sock.on('user_connected', function (data) {
        $scope.onlineUsers.push(data.id);
        $scope.$apply();
    });

    sock.on('user_disconnected', function (data) {
        $scope.onlineUsers.splice($scope.onlineUsers.indexOf(data.id), 1);
        $scope.$apply();
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
        $scope.message = '';
    };
}]);