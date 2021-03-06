﻿(function () {

'use strict';

/* App Module */

var app = angular.module('countdowntimer', [
  'ngRoute',
  'ngResource',
  'cntDwnControllers',
  'cntDwnDirectives',
  'cntDwnFilters',
  'cntDwnServices'
]);
 
app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/time', {
            templateUrl: 'Partials/countdown.html'
        }).
        otherwise({
            redirectTo: '/time'
        });
  }]);

})();