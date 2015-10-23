(function() {
    'use strict';

    angular.module('d3-item-manager').factory('items', items);

    function items($http, locales) {
        return {
            load
        };

        // TODO: don't load them new all the time

        function load() {
            var locale = locales.currentItemLanguage().id;
            return $http.get(`items/items_${locale}.json?${Date.now()}`).
                then(function(result) {
                    return result.data;
                });
        }
    }
})();