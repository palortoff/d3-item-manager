(function() {
    'use strict';

    angular.module('d3-item-manager').factory('items', items);

    function items($http, locales) {
        return {
            load
        };

        function load() {
            var locale = locales.currentItemLanguage().id;
            return $http.get(`items/items_${locale}.json?${Date.now()}`).
                then(function(result) {
                    return result.data;
                });
        }
    }
})();