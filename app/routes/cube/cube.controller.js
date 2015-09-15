(function() {
    'use strict';

    angular.module('d3-item-manager').controller('CubeController', CubeController);

    function CubeController(loadItems, sections, isItemVisible, gameModes, seasons, itemFilter, columns) {
        var vm = this;

        vm.itemChanged = itemChanged;

        vm.itemFilter = itemFilter;

        vm.sections = sections.all;
        vm.section = sections.current;

        vm.isVisible = isItemVisible;

        vm.gameMode = gameModes.current;
        vm.season = seasons.current;
        vm.columns = columns;

        init();

        function init() {
            vm.tracking = {};
            sections.all.forEach(function(section) {load(section)});
        }

        function load(section) {
            loadItems(section).
                then(function(data) {
                    vm[section] = data;
                }).
                then(loadTracking.bind(null, section)).
                then(addTracking.bind(null, section));
        }

        function loadTracking(section) {
            vm.tracking[section] = JSON.parse(localStorage.getItem(section));
            if (!vm.tracking[section]) vm.tracking[section] = {};
            return vm.tracking[section];
        }

        function addTracking(section, tracking) {
            vm[section].forEach(function(item) {
                if (!tracking[item.id]) tracking[item.id] = {};
                item.track = tracking[item.id];
            })
        }

        function itemChanged(section) {
            localStorage.setItem(section, JSON.stringify(vm.tracking[section]));
        }
    }

})();