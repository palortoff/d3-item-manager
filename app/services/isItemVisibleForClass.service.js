(function() {
    'use strict';

    angular.module('d3-item-manager').factory('isItemVisibleForClass', isItemVisibleForClass);

    function isItemVisibleForClass(classes, $http) {

        var itemTypeClass;
        var isLoaded = false;

        $http.get('items/itemTypeClass.json?' + Date.now()).
            then(function(result) {
                itemTypeClass = result.data;
                isLoaded = true;
            });

        return function(item) {
            if (!isLoaded) return false;

            if (classes.current().id == 0) return true;

            if (item.name === "Eye of Peshkov")
            {
                isLoaded = true; // TODO: remove debug line
            }

            var itemVisibility = isItemVisible(item);
            if (itemVisibility === false) return false;
            if (itemVisibility === true) return true;

            return isItemTypeVisible(item);

        };

        function isItemVisible(item){
            if (item.classes){
                return _.contains(item.classes, classes.current().name);
            }
            return undefined;
        }

        function isItemTypeVisible(item){
            if (itemTypeClass[item.type.id]){
                return _.contains(itemTypeClass[item.type.id], classes.current().name);
            }

            return true;
        }
    }

})();