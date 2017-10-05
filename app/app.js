'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute', 
  'ngCookies',
  'datePicker', 
  'ui.bootstrap',
  'myApp.loader',
  'myApp.home',
  'myApp.dashboard',
  'myApp.services',
  'myApp.filters',
  'myApp.utility',
  'myApp.version',
  'myApp.modals'
])
  .config(['$locationProvider', '$routeProvider', '$httpProvider', function ($locationProvider, $routeProvider, $httpProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({ redirectTo: '/home' });

    $httpProvider.defaults.headers.get = {};
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }])
  .directive('convertToNumber', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function(val) {
          return val != null ? parseInt(val, 10) : null;
        });
        ngModel.$formatters.push(function(val) {
          return val != null ? '' + val : null;
        });
      }
    };
  });
