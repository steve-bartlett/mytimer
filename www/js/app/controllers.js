(function () {
    var url = 'http://192.168.1.2:3000';
    'use strict';

    var timer = { hours: 0, minutes: 0, seconds: 0 };

    /* Controllers */

    var app = angular.module('countdowntimerControllers', []);

    app.controller('countdownCtrl', function ($interval) {

        this.timer = timer;

        var getPhoneGapPath = function() {
            var path = window.location.pathname;
            path = path.substr( path, path.length - 10 );
            return 'file://' + path;   
        }

        var playFinishAlarm = function () {
            console.log("inside playFinishAlarm() ");
            console.log('window.location.pathname = ' + window.location.pathname );
            console.log('getPhoneGapPath = ' + getPhoneGapPath() + 'siren.wav' );

//            var my_media = new Media( url + '/audio/siren.wav',

            var my_media = new Media('/android_asset/www/siren.wav',
                function () {
                    console.log("playAudio():Audio Success");
                    my_media.seekTo(0);
                    my_media.play();
                },
                function (err) {
                    console.log("playAudio():Audio Error: " + err);
                }
            );
            // Play audio
            my_media.play();
        }

        this.startTimer = function () {
            --timer.seconds;
            if (timer.seconds <= 0) {
                if (timer.minutes <= 0) {
                    if (timer.hours <= 0) {

                        if (angular.isDefined(stop)) {
                            $interval.cancel(stop);
                            stop = undefined;

                            playFinishAlarm();
                        }
                    }
                    else {
                        --timer.hours;
                        timer.minutes = 59;
                    }
                }
                else {
                    --timer.minutes;
                    timer.seconds = 59;
                }
            }
        };

        this.running = function () {
            if (angular.isDefined(stop)) return true;

            return false;
        }

        var stop;
        this.start = function () {
            // Don't start a new timer if we are already timering
            if (angular.isDefined(stop)) return;

            stop = $interval(this.startTimer, 1000);
        }

        this.stoptimer = function () {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
            }
        }

    });

})();