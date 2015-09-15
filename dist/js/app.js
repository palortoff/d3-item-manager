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

    angular.module('d3-item-manager').value('itemFilter', {
        filter: ''
    });

})();
(function() {
    'use strict';

    angular.module('d3-item-manager').config(["$routeProvider", function($routeProvider) {

        $routeProvider.
            when('/', {
                redirectTo: '/cube'
            }).
            when('/cube', {
                templateUrl: 'routes/cube/cube.template.html',
                controller:'CubeController',
                controllerAs: 'vm'
            }).
            when('/editor', {
                templateUrl: 'routes/editor/editor.template.html',
                controller: 'EditorController',
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
            distinct: distinct,
            current:    current,
            setCurrent: setCurrent
        };

        function current() {
            return _.find(all(), function(c) {return c.id == _current;});
        }

        function all() {
            return _all;
        }
        function distinct(){
            return _all.filter(function(c){return c.id != 0;});
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

    angular.module('d3-item-manager').factory('isItemVisible', isItemVisible);

    function isItemVisible(classes) {
        return function(item) {
            if (classes.current().id == 0) return true;
            return !!_.find(item.classes, function(itemClass) {
                return itemClass == classes.current().id;
            })
        }
    }
    isItemVisible.$inject = ["classes"];

})();
(function() {
    'use strict';

    angular.module('d3-item-manager').factory('loadItems', loadItems);

    function loadItems($http){
        return  function (section)
        {
            return $http.get('items/'+section+'.json').
                then(function(result) {
                    return result.data;
                });
        }
    }
    loadItems.$inject = ["$http"];


})();
(function() {
    'use strict';

    angular.module('d3-item-manager').factory('seasons', seasons);

    var keyAll = 'allSeasons';
    var keyCurrent = 'currentSeason';
    var defaultSet = ['Season 4'];

    var _all = JSON.parse(localStorage.getItem(keyAll)) || defaultSet;
    var _current = localStorage.getItem(keyCurrent) || _all[0];

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

    angular.module('d3-item-manager').factory('sections', sections);

    var all = ['armor', 'weapons', 'jewelry'];
    var current = all[0];

    function sections(){
        current = localStorage.getItem('section') || all[0];

        return {
            all: all,
            current: function(){return current;},
            set: set
        };

        function set(s){
            current = s;
            localStorage.setItem('section', s)
        }
    }

})();
(function() {
    'use strict';

    angular.module('d3-item-manager').directive('disclaimer', disclaimer);

    var disclaimerVersion = 1;
    var key = 'disclaimerRead';

    function disclaimer(){
        DisclaimerController.$inject = ["d3Config"];
        return {
            restrict:'E',
            scope: {},
            templateUrl: 'directives/disclaimer/disclaimer.template.html',
            controller: DisclaimerController,
            controllerAs: 'vm'
        };

        function DisclaimerController(d3Config){
            var vm = this;
            vm.d3Config = d3Config;
            vm.showDisclaimer= showDisclaimer;
            vm.dismiss = dismiss;

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

    angular.module('d3-item-manager').controller('NavBarController', NavBarController);

    function NavBarController(classes, gameModes, seasons) {
        var vm = this;

        vm.gameModes = gameModes;
        vm.seasons = seasons;
        vm.classes = classes;

        vm.showDisclaimer = function() {
            localStorage.setItem('disclaimerRead', 0);
        };
        vm.showOptions = function() {
            localStorage.setItem('showOptions', "true");
        };
    }
    NavBarController.$inject = ["classes", "gameModes", "seasons"];
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
    CubeController.$inject = ["loadItems", "sections", "isItemVisible", "gameModes", "seasons", "itemFilter", "columns"];

})();
(function() {
    'use strict';
    angular.module('d3-item-manager').controller('EditorController', EditorController);

    function EditorController($q, loadItems, sections, isItemVisible, classes) {
        var vm = this;

        vm.isVisible = isItemVisible;

        vm.sections = sections.all;
        vm.section = sections.current;

        vm.toggleVisibility = toggleVisibility;

        init();

        function init() {
            sections.all.forEach(function(section) {load(section)});
        }



        function load(section) {
            _loadItems(section).
                then(function(data) {
                    vm[section] = data;
                }).
                then(addVisibility.bind(null, section));
        }

        function _loadItems(section){
            var data = localStorage.getItem('json_' + section);
            if (data){
                data = JSON.parse(data);
                return $q.when(data);
            }
            else{
                return loadItems(section);
            }
        }

        function addVisibility(section) {
            vm[section].forEach(function(item) {
                if (!item.classes) {
                    item.classes = [];
                }
            })
        }

        function toggleVisibility(item) {
            if (isItemVisible(item)) {
                item.classes = item.classes.filter(function(c){return c != classes.current();});
            }
            else {
                item.classes.push(classes.current());
            }

            saveSection();
        }

        function saveSection(){
            localStorage.setItem('json_' + sections.current(), JSON.stringify(vm[sections.current()]));
        }
    }
    EditorController.$inject = ["$q", "loadItems", "sections", "isItemVisible", "classes"];

})();
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
    MainController.$inject = ["sections", "itemFilter"];

})();
//# sourceMappingURL=app.js.map