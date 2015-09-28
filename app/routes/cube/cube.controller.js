(function() {
    'use strict';

    angular.module('d3-item-manager').controller('CubeController', CubeController);

    function CubeController(loadItems, sections, isItemVisible, gameModes, seasons, columns) {
        var vm = this;

        vm.itemChanged = itemChanged;

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

        function toggle(item, column) {
            if (!item.track[vm.gameMode()]) {
                item.track[vm.gameMode()] = {};
            }
            if (!item.track[vm.gameMode()][vm.season()]) {
                item.track[vm.gameMode()][vm.season()] = {};
            }
            item.track[vm.gameMode()][vm.season()][column] = !item.track[vm.gameMode()][vm.season()][column];
            save();
        }

        function save(){
            // TODO: not optimal, but this will be removed when new item structure is implemented.
            _.forEach(sections.all, itemChanged);
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