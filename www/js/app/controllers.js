     'use strict';

    /* Controllers */

    var cntrl = angular.module('cntDwnControllers', []);

    cntrl.controller('cntDwnCtrl', function ($scope, $interval, Counter, Sounds) {

        $scope.timer = { hours: "", minutes: "", seconds: "" };
        $scope.isrunning = false;
        $scope.soundplaying = false;

        $scope.starttimer = function () {

            if ($scope.timer.hours == 0 && $scope.timer.minutes == 0 && $scope.timer.seconds == 0) {
                return;
            }

            Counter.Initial($scope.timer.hours, $scope.timer.minutes, $scope.timer.seconds);

            $scope.$watch(function () { return Counter; }, function (Counter) {
                $scope.timer.hours = Counter.hours;
                $scope.timer.minutes = Counter.minutes;
                $scope.timer.seconds = Counter.seconds;
                $scope.isrunning = Counter.IsRunning();

                if (Counter.completed && !Sounds.soundplaying) {
                    resetTimes();
                    Sounds.playFinishAlarm();
                }
            }, true); 

            $scope.$watch(function () { return Sounds.soundplaying; }, function (newValue) {
                navigator.notification.alert(
'$scope.$watch' + newValue,  // message
function alertDismissed() {
    sounds.soundplaying = false;
},         // callback
'Note',            // title
'Done'                  // buttonName
);
                $scope.soundplaying = Sounds.soundplaying;
            }, true);

            Counter.Start();
            //window.plugins.insomnia.keepAwake();
            document.getElementById('usecond').blur()
        };

        $scope.stoptimer = function () {
            Counter.Stop();
            //window.plugins.insomnia.allowSleepAgain();
            $scope.isrunning = false;
        };

        $scope.stopsound = function () {
            Sounds.cancelFinishAlarm();
            resetTimes();
        };
        
        var resetTimes = function () {
            if ($scope.timer.hours == 0 && $scope.timer.minutes == 0 && $scope.timer.seconds == 0) {
                $scope.timer.hours = $scope.timer.minutes = $scope.timer.seconds = '';
            }
        };
    });

