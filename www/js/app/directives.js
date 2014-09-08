
(function () {
    'use strict';

    /* Directives */

    var app = angular.module('cntDwnDirectives', []);

    //app.directive('hhmmss', function () {
    //    return {
    //        templateUrl: 'Partials/hhmmss.html',

    //        //link: function (scope, element, attrs) {
    //        //    var format,
    //        //        timeoutId;

    //        //    function updateTime() {

    //        //    }
    //        //}
    //    }

    //})
    //  .directive('myCurrentTime', ['$interval', 'dateFilter', function ($interval, dateFilter) {

    //      function link(scope, element, attrs) {
    //          var format = 'HH:mm:ss',
    //              timeoutId;

    //          //function updateTime() {
    //          //    element.text(dateFilter(new Date(), format));
    //          //}

    //          function updateTimer() {
    //              --timer.seconds;
    //              if (timer.seconds <= 0) {
    //                  if (timer.minutes <= 0) {
    //                      if (timer.hours <= 0) {

    //                          if (angular.isDefined(stop)) {
    //                              $interval.cancel(stop);
    //                              stop = undefined;

    //   //                           playFinishAlarm();
    //   //                           window.plugins.insomnia.allowSleepAgain();
    //                          }
    //                      }
    //                      else {
    //                          --timer.hours;
    //                          timer.minutes = 59;
    //                      }
    //                  }
    //                  else {
    //                      --timer.minutes;
    //                      timer.seconds = 59;
    //                  }
    //              }
    //          };

    //          scope.$watch(attrs.myCurrentTime, function (value) {
    //              format = value;
    //              //updateTime();
    //              updateTimer();
    //          });

    //          element.on('$destroy', function () {
    //              $interval.cancel(timeoutId);
    //          });

    //          // start the UI update process; save the timeoutId for canceling
    //          timeoutId = $interval(function () {
    //              updateTime(); // update DOM
    //          }, 1000);
    //      }

    //      return {
    //          link: link
    //      };
    //  }]);

})();