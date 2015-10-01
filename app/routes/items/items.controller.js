(function() {
    'use strict';

    angular.module('d3-item-manager').controller('ItemsController', ItemsController);

    function ItemsController(items, itemTracking, sections, isItemVisible, gameModes, seasons, columns) {
        var vm = this;

        vm.itemFilter = '';

        vm.sections = sections.all;
        vm.section = sections.current;

        vm.isVisible = isItemVisible;

        vm.gameMode = gameModes.current;
        vm.season = seasons.current;
        vm.columns = columns;

        vm.toggle = toggle;
        vm.class = getClass;
        vm.allColumns = allColumns;

        init();

        function init() {
            sections.all.forEach(function(section) {load(section)});
        }

        function load(section) {
            items.load(section).
                then(function(data) {
                    vm[section] = data;
                }).
                then(itemTracking.load.bind(null, section)).
                then(addTracking.bind(null, section));
        }

        function addTracking(section, tracking) {
            vm[section].forEach(function(item) {
                if (!tracking[item.id]) tracking[item.id] = {};
                item.track = tracking[item.id];
            })
        }


        function toggle(item, column) {
            if (!item.track[vm.gameMode()]) {
                item.track[vm.gameMode()] = {};
            }
            if (!item.track[vm.gameMode()][vm.season()]) {
                item.track[vm.gameMode()][vm.season()] = {};
            }
            item.track[vm.gameMode()][vm.season()][column] = !item.track[vm.gameMode()][vm.season()][column];
            itemTracking.save();
        }

        function getClass(item, column) {
            if (!isChecked(item, column)) {
                return '';
            }
            else {
                return 'checked'
            }
        }

        function isChecked(item, column) {
            try {
                return item.track[vm.gameMode()][vm.season()][column];
            }
            catch (e) {
                return false;
            }
        }

        function allColumns() {
            return _.flatten(['Cubed', vm.columns.all()]);
        }
    }

})();