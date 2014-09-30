'use strict';

describe('Controllers: cntDwnCtrl', function () {

    beforeEach(module('cntDwnControllers'));

    beforeEach(function () {
        var mockService = {};
        module('cntDwnServices', function ($provide) {
            $provide.value('Counter', mockService);
        });
        mockService.Start = function () {
        }
    });

    var scope, ctrl, counter = {}, sounds = {};
    // $scope, $interval, Counter, Sounds

    beforeEach(inject(function ($controller, $rootScope, $interval, mockService, sounds) {
        scope = $rootScope.$new();
        ctrl = $controller('cntDwnCtrl',
            { $scope: scope, $interval: $interval, Counter: mockService, Sounds: sounds });
    }));

    it('should change greeting value if name value is changed', function () {
        scope.name = "Frederik";
        scope.$digest();
        expect(scope.greeting).toBe("Greetings Frederik");
    });

    //expect(scope.isrunning).toBe(false);
    //expect(scope.soundplaying).toBe(false);
    //expect(scope.timer.hours).toBe('');
    //expect(scope.timer.minutes).toBe('');
    //expect(scope.timer.seconds).toBe('');

    //it('should create "timer" controller for timing', inject(function ($controller) {
    //    var scope = {}, ctrl = $controller('cntDwnCtrl', { $scope: scope });

    //    expect(ctrl).not.toBe(null);
    //    scope.timer.seconds = 5;
    //    expect(scope.isrunning).toBe(false);
    ////    ctrl.starttimer();
    //    //expect(scope.isrunning).toBe(true);

    //}));

});