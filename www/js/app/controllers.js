     'use strict';

    /* Controllers */ 

     var controllers = angular.module('cntDwnControllers', []);

     controllers.controller('cntDwnCtrl', function ($scope, $interval, Counter, Sounds) {

        $scope.timer = { hours: "", minutes: "", seconds: "" };
        $scope.isrunning = false;
        $scope.soundplaying = false;

        $scope.starttimer = function () {

            if ($scope.timer.hours == 0 && $scope.timer.minutes == 0 && $scope.timer.seconds == 0) {
                return;
            }

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
                $scope.soundplaying = Sounds.soundplaying;
            }, true);

            Counter.InitialStart($scope.timer.hours, $scope.timer.minutes, $scope.timer.seconds);

            // Android bug?
            // temp fix for now
            document.getElementById('usecond').blur()
            window.plugins.insomnia.keepAwake();
        };

        $scope.stoptimer = function () {
            Counter.Stop();
            $scope.isrunning = false;
            window.plugins.insomnia.allowSleepAgain();
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

        $scope.$on('$destroy', function () { Counter.Cleanup(); });
    });

