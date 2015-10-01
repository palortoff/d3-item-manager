(function() {
    'use strict';

    angular.module('d3-item-manager').factory('items', items);

    function items($http) {
        return {
            load
        };

        function load() {
            return $http.get('items/items.json?' + Date.now()).
                then(function(result) {
                    return result.data;
                });
        }
    }
})();