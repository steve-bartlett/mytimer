﻿
'use strict';

/* Services */

(function () {
    var istesting = true;
    var sound_url = 'https://github.com/steve-bartlett/mytimer/blob/master';

    var countdownServices = angular.module('cntDwnServices', []);

    /*********************************************************************/
    // Counter
    /*********************************************************************/

    countdownServices.factory('Counter', function ($interval) {

        var stop;
        var counter = { hours: 0, minutes: 0, seconds: 0, completed: false };

        counter.Start = function () {
            // Don't start a new timer if we are already timering
            if (angular.isDefined(stop)) return;

            counter.completed = false;
            stop = $interval(startcountdown, 1000);
        }

        counter.Stop = function () {
            complete();
        }

        counter.Initial = function (h, m, s) {
            counter.hours = h;
            counter.minutes = m,
            counter.seconds = s;
        }

        counter.Reset = function () {
            counter.hours = counter.minutes = counter.seconds = 0;
        }

        counter.IsRunning = function () {
            return angular.isDefined(stop);
        }

        var complete = function () {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
            }
        }

        var startcountdown = function () {
            --counter.seconds;
            if (counter.seconds <= 0) {
                if (counter.minutes <= 0) {
                    if (counter.hours <= 0) {
                        complete();
                        counter.completed = true;
                    }
                    else {
                        --counter.hours;
                        counter.minutes = 59;
                    }
                }
                else {
                    --counter.minutes;
                    counter.seconds = 59;
                }
            }
        };

        counter.Cleanup = function () {
            // Make sure that the interval is destroyed too
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
            }
        }

        return counter;

    });


    /*********************************************************************/
    // Media player
    /*********************************************************************/

    countdownServices.factory('Sounds', function () {

        var sounds = { repeat: 1, soundplaying: false };
        var my_media;

        sounds.playFinishAlarm = function () {

            sounds.soundplaying = true;

                      var my_media = new Media('/android_asset/www/siren.wav',
         //   console.log("playing " + getPhoneGapPath() + '/www/siren.wav');
          //  my_media = new Media(getPhoneGapPath() + '/www/siren.wav',
                function () {
                    console.log("playAudio():Audio Success");
                    sounds.soundplaying = false;                  
                },
                function (err) {
                    console.log("playAudio():Audio Error: " + err.code + " " + err.message);
                    sounds.soundplaying = false;
                }
            );

            // Play audio
            my_media.play();
            console.log("sounds.soundplaying " + sounds.soundplaying);
        };

        sounds.cancelFinishAlarm = function () {
            console.log("inside cancelFinishAlarm() ");
            sounds.soundplaying = false;
            if (angular.isDefined(my_media)) {
                my_media.stop();
            }         
        };

        var getPhoneGapPath = function () {
            var path = window.location.pathname;
            var phoneGapPath = path.substring(0, path.lastIndexOf('/') + 1);

            if (istesting) {
                console.log("istesting");
                phoneGapPath = sound_url;
            }
            console.log("phoneGapPath = " + phoneGapPath);
            return phoneGapPath;
        };

        return sounds;

    });

})();