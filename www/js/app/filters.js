
(function () {
    'use strict';

    /* Directives */

    var app = angular.module('cntDwnFilters', []);

    app.filter('time', function () {
        return function (input) {
            out = input;
            if (angular.isNumber(input)) {
                if (input == 0)
                {
                    out = '';
                }
                else if (input < 10 && input > 0) {
                    out = '0' + input;
                }
            }

            return out;
        };
    })

})();