// App
var app = angular.module('app', ['ngAnimate', 'ngAria', 'ngMaterial']);
var sock = io();

// Service to fetch some data..
app.factory('dataServ', ['$http', function ($http) {
    return {
        get: function () {
            return $http.get('/data');
        }
    }
}]);

// App controller
app.controller('appController', ['$scope', 'dataServ', function ($scope, Data) {
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

    $scope.funnyStuff = {question: '', answer: ''};

    Data.get()
        .success(function (resp) {
            $scope.funnyStuff = resp;
        });

    $scope.send = function () {
        sock.emit('send', {
            author: $scope.id,
            msg: $scope.message
        });
    };
}]);