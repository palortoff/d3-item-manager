(function() {
    'use strict';

    angular.module('d3-item-manager').factory('items', items);

    function items($http, config) {
        return {
            load
        };

        function load() {
            var itemLanguage = config.get().itemLanguage || 'en_GB'; // TODO: factor out!
            return $http.get(`items/items_${itemLanguage}.json?${Date.now()}`).
                then(function(result) {
                    return result.data;
                });
        }
    }
})();