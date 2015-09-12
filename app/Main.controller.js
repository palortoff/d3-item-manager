(function() {
    'use strict';

    angular.module('d3-item-manager').controller('MainController', MainController);

    function MainController(sections, itemFilter) {
        var vm = this;

        vm.sections = sections.all;
        vm.section = sections.current;
        vm.setSection = sections.set;

        vm.itemFilter = itemFilter;
    }

})();