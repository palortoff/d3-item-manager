(function() {
    'use strict';

    angular.module('d3-item-manager').controller('ItemsController', ItemsController);

    function ItemsController($scope, items, itemTracking, isItemVisibleForCategory, isItemVisibleForClass, gameModes, seasons, columns, itemCategory, constants, isEndGame, config) {
        var vm = this;

        vm.itemFilter = '';
        persist('filterOverAll');
        persist('onlyCubable');
        persist('hideCubed');

        vm.isVisible = isVisible;

        vm.gameMode = gameModes.current;
        vm.season = seasons.current;
        vm.columns = columns;
        vm.itemCategory = itemCategory;
        vm.isSeasonal = isSeasonal;
        vm.bountyTitle = bountyTitle;
        vm.isBounty = isBounty;
        vm.isCrafted = isCrafted;

        vm.toggle = toggle;
        vm.cellClass = cellClass;
        vm.allColumns = allColumns;
        vm.items = undefined;
        vm.link = link;

        init();

        function init() {
            loadItems();
        }

        function loadItems() {
            items.load().
                then(function(data) {
                    vm.items = data;
                }).
                then(itemTracking.load).
                then(addTracking);
        }

        function addTracking(tracking) {
            vm.items.forEach(function(item) {
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

        function cellClass(item, column) {
            return isChecked(item, column) ? 'checked' : '';
        }

        function isChecked(item, column) {
            try {
                return item.track[vm.gameMode()][vm.season()][column];
            }
            catch (e) {
                return false;
            }
        }

        function isCubed(item) {
            return isChecked(item, 'Cubed');
        }

        function allColumns() {
            return _.flatten(['Cubed', vm.columns.all()]);
        }

        function isVisible(item) {
            if (!isEndGame(item)) return false;

            if (vm.filterOverAll && vm.itemFilter.length > 0) return true;

            if (vm.onlyCubable && !item.cube) return false;
            if (vm.hideCubed && isCubed(item)) return false;

            if (!isItemVisibleForCategory(item)) return false;

            return isItemVisibleForClass(item);

        }

        function isSeasonal(item) {
            return item.season == constants.gameSeason;
        }

        function isBounty(item) {
            return !!item.bounty;
        }

        function bountyTitle(item) {
            return (isBounty(item)) ? 'Act ' + item.bounty.act : '';
        }

        function isCrafted(item) {
            return item.crafted;
        }

        function link(item) {
            var artisan = '';
            if (item.crafted) {
                switch (item.slots[0]) {
                    case 'neck':
                    case 'left-finger':
                    case 'right-finger':
                        artisan = 'artisan/jeweler/';
                        break;
                    default:
                        artisan = 'artisan/blacksmith/';
                }
            }
            var locale = currentItemLocale();
            return `http://${locale.region}.battle.net/d3/${locale.short}/${artisan}${item.tooltipParams}`;
        }

        function currentItemLocale() { // TODO: duplicated code! DRY!!!
            var id = config.get().itemLanguage || 'en_GB';
            return _.find(constants.locales, function(l) {return l.id == id;});
        }

        function persist(key) {
            vm[key] = localStorage.getItem(key) === 'true' || false;

            $scope.$watch(getKey, function(){
                localStorage.setItem(key, vm[key]);
            });

            function getKey(){
                return vm[key];
            }
        }
    }

})();