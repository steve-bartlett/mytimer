﻿(function () {
    var url = 'http://192.168.1.2:3000';
    'use strict';

    var timer = { hours: '', minutes: '', seconds: '' };

    /* Controllers */

    var cntrl = angular.module('cntDwnControllers', []);

    cntrl.controller('cntDwnCtrl', function ($interval) {

        this.timer = timer;

        var getPhoneGapPath = function() {
            var path = window.location.pathname;
            path = path.substr( path, path.length - 10 );
            return 'file://' + path;   
        }

        var resetTimes = function () {
            if (timer.hours == 0 && timer.minutes == 0 && timer.seconds == 0) {
                timer.hours = timer.minutes = timer.seconds = '';
            }
        }

        var playFinishAlarm = function () {
            console.log("inside playFinishAlarm() ");
            console.log('window.location.pathname = ' + window.location.pathname );
            console.log('getPhoneGapPath = ' + getPhoneGapPath() + 'siren.wav' );

            var repeat = 1;
            var my_media = new Media('/android_asset/www/siren.wav',
                function () {
                    console.log("playAudio():Audio Success");
                    if (repeat > 0)
                    {
                        repeat = repeat - 1;
                        my_media.seekTo(0);
                        my_media.play();
                    }
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

                            resetTimes();
                            playFinishAlarm();
                            window.plugins.insomnia.allowSleepAgain();
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

            if (this.timer.hours == '' && this.timer.minutes == '' && this.timer.seconds == '') {
                return;
            }
            if (this.timer.hours == '') {
                this.timer.hours = 0
            }
            if (this.timer.minutes == '') {
                this.timer.minutes = 0
            }
            if (this.timer.seconds == '') {
                this.timer.seconds = 0
            }

            stop = $interval(this.startTimer, 1000);
            window.plugins.insomnia.keepAwake();
        }

        this.stoptimer = function () {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
                window.plugins.insomnia.allowSleepAgain();
            }
        }

    });

})();