(function() {
    'use strict';

    angular.module('d3-item-manager').factory('items', items);

    function items($http, config) {
        return {
            load
        };

        function load() {
            return $http.get(`items/items_${config.get().itemLanguage}.json?${Date.now()}`).
                then(function(result) {
                    return result.data;
                });
        }
    }
})();