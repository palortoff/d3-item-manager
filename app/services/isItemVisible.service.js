(function() {
    'use strict';

    angular.module('d3-item-manager').factory('isItemVisible', isItemVisible);

    function isItemVisible(classes) {
        return function(item) {
            if (classes.current().id == 0) return true;
            return !!_.find(item.classes, function(itemClass) {
                return itemClass == classes.current().id;
            })
        }
    }

})();