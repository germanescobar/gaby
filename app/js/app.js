require('angular');
require('angular-animate');
require('angular-route');
require('./constants.js');
require('./directives.js');
require('./controllers.js');
require('./services.js');

var app = angular.module('gaby', [
  'ngAnimate', 
  'ngRoute',
  'gaby.directives',
  'gaby.controllers',
  'gaby.services'
]);

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