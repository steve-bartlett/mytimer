
(function () {
    'use strict';

    /* Directives */

    var filters = angular.module('cntDwnFilters', []);

    filters.filter('paddedtime', function () {
        return function (input) {
            var out = input;
            var i = parseInt(input);
            if( !isNaN(i) && i < 10 && i > 0) {
                out = '0' + i;
            }
            return out;
        };
    });

})();