(function() {
    'use strict';

    angular.module('d3-item-manager').factory('isEndGame', isEndGame);

    function isEndGame() {
        return function(item) {
            if (item.crafted && item.setItem) {
                return item.requiredLevel === 70;
            }
            return true;
        };
    }
})();