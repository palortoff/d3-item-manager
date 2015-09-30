(function() {
    'use strict';

    angular.module('d3-item-manager').factory('items', items);

    function items($http) {
        return {
            load
        };

        function load(section) {
            return $http.get('items/' + section + '.json?' + Date.now()).
                then(function(result) {
                    return result.data;
                });
        }
    }
})();