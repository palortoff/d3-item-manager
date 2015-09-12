(function() {
    'use strict';

    angular.module('d3-item-manager').filter('capitalize', capitalizeFilter);

    function capitalizeFilter() {
        return function(input) {
            if (typeof input === "String") return input;
            var tokens = input.split('-');
            tokens = _.map(tokens, capitalize);
            return tokens.join(' ');
        };

        function capitalize(input) {
            input = input.toLowerCase();
            return input.substring(0, 1).toUpperCase() + input.substring(1);
        }
    }

})();