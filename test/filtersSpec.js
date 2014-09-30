'use strict';

/* jasmine specs for filters go here */

describe('Filters: cntDwnFilters', function () {

    beforeEach(module('cntDwnFilters'));

    describe('paddedtime', function () {

        it('should be able to pad with leading 0',
        inject(function (paddedtimeFilter) {
            expect(paddedtimeFilter('1')).toBe('01');
        }));

    });
});

