(function() {
    'use strict';

    angular.module('d3-item-manager').controller('ItemsController', ItemsController);

    function ItemsController(items, itemTracking, isItemVisibleForCategory, isItemVisibleForClass, gameModes, seasons, columns, itemCategory, d3Config, isEndGame) {
        var vm = this;

        vm.itemFilter = '';

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

        function allColumns() {
            return _.flatten(['Cubed', vm.columns.all()]);
        }

        function isVisible(item) {
            if (!isEndGame(item)) return false;
            if (!isItemVisibleForCategory(item)) return false;

            return isItemVisibleForClass(item);

        }

        function isSeasonal(item) {
            return item.season == d3Config.gameSeason;
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
            return "http://eu.battle.net/d3/en/" + artisan + item.tooltipParams;
        }
    }

})();