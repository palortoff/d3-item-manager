(function() {
    'use strict';

    angular.module('d3-item-manager').directive('itemFilter', itemFilter);

    function itemFilter(){
        return {
            restrict:'E',
            scope: {
                filterValue:'='
            },
            bindToController: true,
            templateUrl: 'directives/itemFilter/itemFilter.template.html',
            controller: ItemFilterController,
            controllerAs: 'vm'
        };

        function ItemFilterController(){
        }
    }

})();