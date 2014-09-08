(function () {

'use strict';

/* App Module */

var countdowntimerApp = angular.module('countdowntimer', [
  'ngRoute',
  'ngResource',
  'cntDwnControllers',
  'cntDwnDirectives',
  'cntDwnFilters'

  //'countdowntimerFilters',
  //'countdowntimerServices'
]);

countdowntimerApp.config(['$routeProvider',
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