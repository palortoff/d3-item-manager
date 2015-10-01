(function() {
    'use strict';

    angular.module('d3-item-manager', ['ngRoute']);
})();
(function() {
    'use strict';

    angular.module('d3-item-manager').filter('capitalize', capitalizeFilter);

    function capitalizeFilter() {
        return function(input) {
            if (typeof input === "String") return input;
            var tokens = input.split('-');
            tokens = _.map(tokens, capitalize);
            return tokens.join(' ');
        };

        function capitalize(input) {
            input = input.toLowerCase();
            return input.substring(0, 1).toUpperCase() + input.substring(1);
        }
    }

})();
(function() {
    'use strict';

    angular.module('d3-item-manager').constant('d3Config', {
        githubUrl: 'https://github.com/palortoff/d3-item-manager'
    })

})();
(function() {
    'use strict';

    angular.module('d3-item-manager').config(["$routeProvider", function($routeProvider) {

        $routeProvider.
            when('/', {
                redirectTo: '/items'
            }).
            when('/items', {
                templateUrl: 'routes/items/items.template.html',
                controller:'ItemsController',
                controllerAs: 'vm'
            });
    }]);
})();
(function() {
    'use strict';

    angular.module('d3-item-manager').factory('classes', classes);

    var keyCurrent = 'currentClass';

    var _all = [
        {id: 0, name: 'all'},
        {id: 6, name: 'barbarian'},
        {id: 3, name: 'crusader'},
        {id: 2, name: 'demon-hunter'},
        {id: 1, name: 'monk'},
        {id: 4, name: 'witch-doctor'},
        {id: 5, name: 'wizard'}
    ];
    var _current = localStorage.getItem(keyCurrent) || 6;

    function classes() {
        return {
            all:        all,
            distinct:   distinct,
            current:    current,
            setCurrent: setCurrent
        };

        function current() {
            return _.find(all(), function(c) {return c.id == _current;});
        }

        function all() {
            return _all;
        }

        function distinct() {
            return _all.filter(function(c) {return c.id != 0;});
        }

        function setCurrent(id) {
            _current = id;
            localStorage.setItem(keyCurrent, id)
        }
    }

})();
(function() {
    'use strict';

    angular.module('d3-item-manager').factory('columns', columns);

    var keyAll = 'allColumns';
    var defaultSet = ['Stashed'];

    var _all = JSON.parse(localStorage.getItem(keyAll)) || defaultSet;

    function columns() {
        return {
            remove:     remove,
            add:        add,
            all:        all
        };

        function all() {
            return _all;
        }

        function remove(gm) {
            _all = _all.filter(function(item) {return item !== gm;});
            save();
        }

        function add(gm) {
            if (_.contains(_all, gm)) return;
            _all.push(gm);
            save();
        }

        function save() {
            localStorage.setItem(keyAll, JSON.stringify(_all));
        }
    }

})();
(function() {
    'use strict';

    angular.module('d3-item-manager').factory('gameModes', gameModes);

    var keyAll = 'allGameModes';
    var keyCurrent = 'currentGameMode';
    var defaultSet = ['Softcore', 'Hardcore'];

    var _all = JSON.parse(localStorage.getItem(keyAll)) || defaultSet;
    var _current = localStorage.getItem(keyCurrent) || _all[0];

    function gameModes() {
        return {
            current:    current,
            setCurrent: setCurrent,
            remove:     remove,
            add:        add,
            all:        all
        };

        function current() {
            return _current;
        }

        function all() {
            return _all;
        }

        function setCurrent(c) {
            _current = c;
            localStorage.setItem(keyCurrent, c)
        }

        function setDefault() {
            if (!_.find(_all, current)) {
                setCurrent(_all[0]);
            }
        }

        function remove(gm) {
            _all = _all.filter(function(item) {return item !== gm;});
            setDefault();
            save();
        }

        function add(gm) {
            if (_.contains(_all, gm)) return;
            _all.push(gm);
            save();
        }

        function save() {
            localStorage.setItem(keyAll, JSON.stringify(_all));
        }
    }

})();
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
    isItemVisibleForClass.$inject = ["classes", "$http"];

})();
(function() {
    'use strict';

    angular.module('d3-item-manager').factory('isItemVisibleForCategory', isItemVisibleForCategory);

    function isItemVisibleForCategory(itemCategory) {
        return function(item) {
            return itemCategory.current().filter(item);
        }
    }
    isItemVisibleForCategory.$inject = ["itemCategory"];

})();
(function() {
    'use strict';

    angular.module('d3-item-manager').factory('items', items);

    function items($http) {
        return {
            load
        };

        function load() {
            return $http.get('items/items.json?' + Date.now()).
                then(function(result) {
                    return result.data;
                });
        }
    }
    items.$inject = ["$http"];
})();
(function() {
    'use strict';

    angular.module('d3-item-manager').factory('itemCategory', itemCategory);

    var categories = {
        0:{
            "class":"divider"
        },
        1: {
            name: "Cube: Weapons",
            filter: function(item){
                return item.cube && item.cubeCategory === "Weapon";
            }
        },
        2: {
            name: "Cube: Armor",
            filter: function(item){
                return item.cube && item.cubeCategory === "Armor";
            }
        },
        3:{
            name: "Cube: Jewelry",
            filter: function(item){
                return item.cube && item.cubeCategory === "Jewelry";
            }
        },
        4:{
            name: 'other...'
        }
    };

    var selectionOrder=[1,2,3];

    var current;
    var key='itemCategory';

    function itemCategory(){
        current = localStorage.getItem(key) || 1;

        return {
            all: categories,
            current: function(){return categories[current];},
            getCategory: function(id){return categories[id]},
            selectionOrder: selectionOrder,
            set: set
        };

        function set(s){
            current = s;
            localStorage.setItem(key, s)
        }
    }

})();
(function() {
    'use strict';

    angular.module('d3-item-manager').factory('itemTracking', itemTracking);

    var key = 'itemTracking';

    function itemTracking($timeout) {
        var tracking;
        var notifyTimer;
        var tracking2;
        return {
            load,
            save
        };

        function load() {
            upgradeIfNecessary();
            tracking = JSON.parse(localStorage.getItem(key)) || {};
            return tracking;
        }

        function save() {
            notifySave();
            localStorage.setItem(key, JSON.stringify(tracking));
        }

        function notifySave() {
            $timeout.cancel(notifyTimer);
            notifyTimer = $timeout(function() {
                toastr.success('Items saved', {timeOut: 1000});
            }, 1000);
        }

        function upgradeIfNecessary() {
            upgradeFromCubeSectionsToOneTrackingContainer();
        }

        function upgradeFromCubeSectionsToOneTrackingContainer() {
            var hasOldSectionData = !!localStorage.getItem('armor') || !!localStorage.getItem('weapons') || !!localStorage.getItem('jewelry');
            var hasTrackingContainer = !!localStorage.getItem(key);

            if (hasOldSectionData && !hasTrackingContainer) {
                var armor = JSON.parse(localStorage.getItem('armor'));
                var weapons = JSON.parse(localStorage.getItem('weapons'));
                var jewls = JSON.parse(localStorage.getItem('jewelry'));
                tracking = _.defaults({}, armor, weapons, jewls);
                save();
                console.log("upgradedFromCubeSectionsToOneTrackingContainer");

                localStorage.setItem('armor_backup', JSON.stringify(armor));
                localStorage.setItem('weapons_backup', JSON.stringify(weapons));
                localStorage.setItem('jewls_backup', JSON.stringify(jewls));

                localStorage.removeItem('armor');
                localStorage.removeItem('weapons');
                localStorage.removeItem('jewelry');

            }

        }

    }
    itemTracking.$inject = ["$timeout"];
})();
(function() {
    'use strict';

    angular.module('d3-item-manager').factory('seasons', seasons);

    var keyAll = 'allSeasons';
    var keyCurrent = 'currentSeason';
    var defaultSet = ['Season 4'];

    var _all = JSON.parse(localStorage.getItem(keyAll)) || defaultSet;
    var _current = localStorage.getItem(keyCurrent) || "Non Season";

    function seasons() {
        return {
            current:    current,
            setCurrent: setCurrent,
            remove:     remove,
            add:        add,
            all:        all
        };

        function current() {
            return _current;
        }

        function all() {
            return _all;
        }

        function setCurrent(c) {
            _current = c;
            localStorage.setItem(keyCurrent, c)
        }

        function setDefault() {
            if (!_.find(_all, current)) {
                setCurrent(_all[0]);
            }
        }

        function remove(gm) {
            _all = _all.filter(function(item) {return item !== gm;});
            setDefault();
            save();
        }

        function add(gm) {
            if (_.contains(_all, gm)) return;
            _all.push(gm);
            save();
        }

        function save() {
            localStorage.setItem(keyAll, JSON.stringify(_all));
        }
    }

})();
(function() {
    'use strict';

    angular.module('d3-item-manager').factory('version', version);

    function version($http) {
        return {
            get:        getVersion
        };

        function getVersion(){
            return $http.get('version.json?' + Date.now()).
                then(function(result) {
                    return result.data;
                });

        }
    }
    version.$inject = ["$http"];

})();
(function() {
    'use strict';

    angular.module('d3-item-manager').directive('disclaimer', disclaimer);

    var disclaimerVersion = 1;
    var key = 'disclaimerRead';

    function disclaimer(){
        DisclaimerController.$inject = ["d3Config", "version"];
        return {
            restrict:'E',
            scope: {},
            templateUrl: 'directives/disclaimer/disclaimer.template.html',
            controller: DisclaimerController,
            controllerAs: 'vm'
        };

        function DisclaimerController(d3Config, version){
            var vm = this;
            vm.d3Config = d3Config;
            vm.showDisclaimer= showDisclaimer;
            vm.dismiss = dismiss;
            vm.version = '';

            version.get().then(function(version){
                vm.version = version.version;
            });


            function showDisclaimer(){
                return localStorage.getItem(key) != disclaimerVersion;
            }

            function dismiss(){
                localStorage.setItem(key, disclaimerVersion);
            }
        }
    }

})();
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
            var vm = this;
            vm.clear = clear;
            vm.showClear = showClear;

            function clear(){
                vm.filterValue = '';
            }

            function showClear(){
                return vm.filterValue.length > 0;
            }
        }
    }

})();
(function() {
    'use strict';

    angular.module('d3-item-manager').controller('NavBarController', NavBarController);

    function NavBarController(classes, gameModes, seasons, itemCategory) {
        var vm = this;

        vm.gameModes = gameModes;
        vm.seasons = seasons;
        vm.classes = classes;
        vm.itemCategory = itemCategory;

        vm.showDisclaimer = function() {
            localStorage.setItem('disclaimerRead', 0);
        };
        vm.showOptions = function() {
            localStorage.setItem('showOptions', "true");
        };
    }
    NavBarController.$inject = ["classes", "gameModes", "seasons", "itemCategory"];
})();

(function () {
    'use strict';

    angular.module('d3-item-manager').directive('navBar', function () {
        return {
            restrict:'E',
            templateUrl: 'directives/navbar/navbar.template.html',
            scope: {},
            controller: 'NavBarController',
            controllerAs: 'vm'
        };
    })
})();
(function() {
    'use strict';

    angular.module('d3-item-manager').directive('options', options);

    var disclaimerVersion = 1;
    var key = 'showOptions';

    function options(){
        OptionsController.$inject = ["gameModes", "seasons", "columns"];
        return {
            restrict:'E',
            scope: {},
            templateUrl: 'directives/options/options.template.html',
            controller: OptionsController,
            controllerAs: 'vm'
        };

        function OptionsController(gameModes, seasons, columns){
            var vm = this;
            vm.gameModes = gameModes;
            vm.addNewGameMode = addNewGameMode;

            vm.seasons = seasons;
            vm.addNewSeason = addNewSeason;

            vm.columns = columns;
            vm.addNewColumn = addNewColumn;

            vm.showOptions= showOptions;
            vm.dismiss = dismiss;

            function addNewSeason(){
                seasons.add(vm.newSeason);
                vm.newSeason='';
            }
            function addNewGameMode(){
                gameModes.add(vm.newGameMode);
                vm.newGameMode='';
            }
            function addNewColumn(){
                columns.add(vm.newColumn);
                vm.newColumn='';
            }

            function showOptions(){
                return localStorage.getItem(key) === "true";
            }

            function dismiss(){
                localStorage.setItem(key, "false");
            }
        }
    }

})();
(function() {
    'use strict';

    angular.module('d3-item-manager').controller('ItemsController', ItemsController);

    function ItemsController(items, itemTracking, isItemVisibleForCategory, isItemVisibleForClass, gameModes, seasons, columns, itemCategory) {
        var vm = this;

        vm.itemFilter = '';

        vm.isVisible = isVisible;

        vm.gameMode = gameModes.current;
        vm.season = seasons.current;
        vm.columns = columns;
        vm.itemCategory = itemCategory;

        vm.toggle = toggle;
        vm.cellClass = cellClass;
        vm.allColumns = allColumns;
        vm.items = undefined;

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

        function isVisible(item){
            if (!isItemVisibleForCategory(item)) {
                return false;
            }
            if (!isItemVisibleForClass(item)) {
                return false;
            }
            return true;
        }
    }
    ItemsController.$inject = ["items", "itemTracking", "isItemVisibleForCategory", "isItemVisibleForClass", "gameModes", "seasons", "columns", "itemCategory"];

})();
//# sourceMappingURL=app.js.map