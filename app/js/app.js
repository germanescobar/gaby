require('angular');
require('angular-animate');
require('angular-route');

var app = angular.module('gaby', ['ngAnimate', 'ngRoute']);

var data = [
  { first: 1, second: 1, answer: 2 },
  { first: 2, second: 1, answer: 3 },
  { first: 4, second: 1, answer: 5 },
  { first: 5, second: 1, answer: 6 },
];

app.controller('BodyController', function($scope) {
  $scope.keydown = function(event) {
    $scope.$broadcast('keydown', event);
  }
})

app.controller('GabyController', function($scope, $timeout) {
  $scope.index = 1;
  $scope.data = data;
  $scope.value = "_";
  $scope.correct = false;
  $scope.incorrect = false;

  $scope.$on('keydown', function(e, event) {
    if (event.keyCode == 13) {
      if ($scope.value == $scope.data[$scope.index].answer) {
        $scope.correct = true;
        $scope.index++;
        $timeout(function() {
          $scope.correct = false;
        }, 3000);
      } else {
        $scope.incorrect = true;
        $timeout(function() {
          $scope.incorrect = false;
        }, 2000);
      }
      $scope.value = "_";
    }

    if (event.keyCode == 8) {
      event.preventDefault();
      $scope.value = $scope.value.slice(0, -1);
      if ($scope.value == "") {
        $scope.value = "_";
      }
    }

    if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
      if ($scope.value === "_") {
        $scope.value = "";
      }
      $scope.value += String.fromCharCode(event.keyCode);
    }
    
  });
});

app.controller('AlbumController', function() {

});

app.config(['$routeProvider', function ($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'views/gaby.html',
      controller: 'GabyController'
    })
    .when('/album', {
      templateUrl: 'views/album.html',
      controller: 'AlbumController'
    })
    .otherwise({
      redirectTo: '/'
    });

}]);
