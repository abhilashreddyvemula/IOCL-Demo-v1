'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute', 'mp.datePicker', 'ui.bootstrap',
  'myApp.home',
  'myApp.dashboard', 'myApp.services', 'myApp.utility',
  'myApp.version'
])
.config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});

  $httpProvider.defaults.headers.get = {};
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
