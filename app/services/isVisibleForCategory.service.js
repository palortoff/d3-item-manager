(function() {
    'use strict';

    angular.module('d3-item-manager').factory('isItemVisibleForCategory', isItemVisibleForCategory);

    function isItemVisibleForCategory(itemCategory) {
        return function(item) {
            return itemCategory.current().filter(item);
        }
    }

})();