'use strict';

/* jasmine specs for services go here */

describe('cntDwnServices test', function () {

    describe('when I call Counter', function () {

        beforeEach(module('cntDwnServices'));

        it('returns default values', inject(function (Counter, $interval) { //parameter name = service name
            expect(Counter).not.toBe(null);
            expect(Counter.hours).toEqual(0);
            expect(Counter.minutes).toEqual(0);
            expect(Counter.seconds).toEqual(0);
            expect(Counter.IsRunning()).toBe(false);
            expect(Counter.completed).toBe(false);
        }));

        it('Can set initial values', inject(function (Counter, $interval) { //parameter name = service name
            Counter.Initial(5, 3, 2);
            expect(Counter.hours).toEqual(5);
            expect(Counter.minutes).toEqual(3);
            expect(Counter.seconds).toEqual(2);
        }));

        it('Can reset values', inject(function (Counter, $interval) { //parameter name = service name
            Counter.Initial(5, 3, 2);
            Counter.Reset();
            expect(Counter.hours).toEqual(0);
            expect(Counter.minutes).toEqual(0);
            expect(Counter.seconds).toEqual(0);
            expect(Counter.completed).toBe(false);
        }));

        it('Can count down to zero and stop couting and complete', inject(function (Counter, $interval) { //parameter name = service name
            Counter.Initial(0, 0, 2);
            Counter.Start();
            expect(Counter.hours).toEqual(0);
            expect(Counter.minutes).toEqual(0);
            expect(Counter.seconds).toEqual(2);
            expect(Counter.IsRunning()).toBe(true);

            $interval.flush(1000);
            expect(Counter.seconds).toEqual(1);
            expect(Counter.IsRunning()).toBe(true);

            $interval.flush(1000);
            expect(Counter.seconds).toEqual(0);
            expect(Counter.IsRunning()).toBe(false);
            expect(Counter.completed).toBe(true);
        }));

        it('Can roll down from a minute to seconds', inject(function (Counter, $interval) { //parameter name = service name
            Counter.InitialStart(0, 1, 0);

            expect(Counter.hours).toEqual(0);
            expect(Counter.minutes).toEqual(1);
            expect(Counter.seconds).toEqual(0);
            expect(Counter.IsRunning()).toBe(true);

            $interval.flush(1000);
            expect(Counter.minutes).toEqual(0);
            expect(Counter.seconds).toEqual(59);
            expect(Counter.IsRunning()).toBe(true);

            $interval.flush(1000);
            expect(Counter.minutes).toEqual(0);
            expect(Counter.seconds).toEqual(58);
            expect(Counter.IsRunning()).toBe(true);
        }));

        it('Can stop a running counter', inject(function (Counter, $interval) { //parameter name = service name
            Counter.InitialStart(0, 1, 20);

            $interval.flush(1000);
            expect(Counter.seconds).toEqual(19);
            expect(Counter.IsRunning()).toBe(true);

            Counter.Stop();

            expect(Counter.IsRunning()).toBe(false);
            $interval.flush(1000);
            expect(Counter.seconds).toEqual(19);
            expect(Counter.completed).toBe(false);
        }))
    })
});