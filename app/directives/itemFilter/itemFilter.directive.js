(function() {
    'use strict';

    angular.module('d3-item-manager').directive('itemFilter', itemFilter);

    function itemFilter() {
        return {
            restrict: 'E',

            scope:            {
                filterValue:   '=',
                filterOverAll: '=',
                onlyCubable:   '=',
                hideCubed:     '='
            },
            bindToController: true,
            templateUrl:      'directives/itemFilter/itemFilter.template.html',
                              controller,
            controllerAs:     'vm'
        };

        function controller() {
            var vm = this; // jshint ignore:line
            vm.clear = clear;
            vm.showClear = showClear;

            function clear() {
                vm.filterValue = '';
            }

            function showClear() {
                return vm.filterValue.length > 0;
            }
        }
    }
})();