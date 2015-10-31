'use strict';

(function () {
    'use strict';
    angular.module('d3-item-manager', ['ngRoute', 'toggle-switch', 'download-data', 'ui.bootstrap']);
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').factory('backup', backup);

    function backup(config, itemTracking) {
        return {
            data: data
        };

        function data() {
            return {
                config: config.getCompleteConfig(),
                tracking: itemTracking.get()
            };
        }
    }
    backup.$inject = ["config", "itemTracking"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').factory('exportService', exportService);

    var separator = ';';

    function exportService($q, itemTracking, columns, gameModes, items, seasons) {
        return {
            data: data
        };

        function data() {
            var lines = [];
            return $q.when().then(makeGameModeLine).then(addLines.bind(null, lines)).then(makeSeasonLine).then(addLines.bind(null, lines)).then(makeColumnLine).then(addLines.bind(null, lines)).then(makeItemLines).then(addLines.bind(null, lines)).then(function () {
                return _.flatten(lines).join('\r\n');
            });
        }

        function addLines(lines, newLines) {
            lines.push(newLines);
        }

        function makeGameModeLine() {
            var res = separator;

            _.each(allGameModes(), function (gm) {
                res += gm;
                _.each(allSeasons(), function () {
                    _.each(allColumns(), function () {
                        res += separator;
                    });
                });
            });
            return res;
        }

        function makeSeasonLine() {
            var res = separator;

            _.each(allGameModes(), function () {
                _.each(allSeasons(), function (season) {
                    res += season;
                    _.each(allColumns(), function () {
                        res += separator;
                    });
                });
            });
            return res;
        }

        function makeColumnLine() {
            var res = separator;

            _.each(allGameModes(), function () {
                _.each(allSeasons(), function () {
                    _.each(allColumns(), function (col) {
                        res += col + separator;
                    });
                });
            });
            return res;
        }

        function makeItemLines() {
            return items.load().then(function (items) {
                var itemsForLines = getItemsForLines(items);
                return _.map(itemsForLines, makeItemLine);
            });
        }

        function makeItemLine(item) {
            var res = item.name + separator;
            var gmData, sData, colData;
            _.each(allGameModes(), function (gm) {
                gmData = item[gm];
                if (gmData) {
                    _.each(allSeasons(), function (s) {
                        sData = gmData[s];
                        if (sData) {
                            _.each(allColumns(), function (col) {
                                colData = sData[col];
                                res += (colData ? 1 : '') + separator;
                            });
                        } else {
                            _.each(allColumns(), function () {
                                res += separator;
                            });
                        }
                    });
                } else {
                    _.each(allSeasons(), function () {
                        _.each(allColumns(), function () {
                            res += separator;
                        });
                    });
                }
            });
            return res;
        }

        function getItemsForLines(items) {
            var trackingItems = itemTracking.get();
            _.each(trackingItems, addItemName.bind(null, items));
            return trackingItems;
        }

        function addItemName(items, trackingItem, id) {
            var item = _.find(items, function (item) {
                return item.id === Number(id);
            });
            trackingItem.name = item.name;
        }

        function allGameModes() {
            return gameModes.all();
        }

        function allSeasons() {
            return seasons.reallyAll();
        }

        function allColumns() {
            return columns.reallyAll();
        }
    }
    exportService.$inject = ["$q", "itemTracking", "columns", "gameModes", "items", "seasons"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').controller('RestoreModalCtrl', RestoreModalCtrl);

    function RestoreModalCtrl($uibModalInstance) {
        var vm = this;

        vm.restore = restore;
        vm.cancel = cancel;
        vm.onLoad = onLoad;
        vm.canRestore = canRestore;
        vm.hasInvalidRestoreData = hasInvalidRestoreData;

        var dataToRestore;

        function restore() {
            $uibModalInstance.close(dataToRestore);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function onLoad(loadedData) {
            dataToRestore = JSON.parse(loadedData);
        }

        function canRestore() {
            if (_.isUndefined(dataToRestore)) {
                return false;
            }
            return !hasInvalidRestoreData();
        }

        function hasInvalidRestoreData() {
            if (_.isUndefined(dataToRestore)) {
                return false;
            }
            if (_.isUndefined(dataToRestore.config)) {
                return true;
            }
            return !!_.isUndefined(dataToRestore.tracking);
        }
    }
    RestoreModalCtrl.$inject = ["$uibModalInstance"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').factory('restore', restore);

    function restore($uibModal, $route, config, itemTracking) {
        return {
            trigger: trigger
        };

        function trigger() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'backupRestoreExport/restore.modal.template.html',
                controller: 'RestoreModalCtrl',
                controllerAs: 'vm',
                backdrop: 'static'
            });

            modalInstance.result.then(doRestore)['catch'](dismiss);
        }

        function doRestore(data) {
            config.setCompleteConfigReloadRequired(data.config);
            itemTracking.setCompleteTrackingReloadRequired(data.tracking);
            $route.reload();
        }

        function dismiss() {
            console.log('dismiss');
        }
    }
    restore.$inject = ["$uibModal", "$route", "config", "itemTracking"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').directive('filestyle', filestyle);

    // from https://github.com/markusslima/bootstrap-filestyle/issues/36

    function filestyle() {
        return {
            restrict: 'AC',
            scope: true,
            link: function link(scope, element, attrs) {
                var options = {
                    'input': attrs.input !== 'false',
                    'icon': attrs.icon !== 'false',
                    'buttonBefore': attrs.buttonBefore === 'true',
                    'disabled': attrs.disabled === 'true',
                    'size': attrs.size,
                    'buttonText': attrs.buttontext,
                    'buttonName': attrs.buttonname,
                    'iconName': attrs.iconName,
                    'badge': attrs.badge !== 'false',
                    'placeholder': attrs.placeholder
                };
                $(element).filestyle(options);
            }
        };
    }
})();
'use strict';

(function () {
    'use strict';

    // from http://jsfiddle.net/alexsuch/6aG4x/
    angular.module('d3-item-manager').directive('onLoadedFile', onLoadedFile);

    function onLoadedFile($parse) {
        return {
            restrict: 'A',
            scope: false,
            link: function link(scope, element, attrs) {
                var fn = $parse(attrs.onLoadedFile);

                element.on('change', function (onChangeEvent) {
                    var reader = new FileReader();

                    reader.onload = function (onLoadEvent) {
                        scope.$apply(function () {
                            fn(scope, { fileContent: onLoadEvent.target.result });
                        });
                    };

                    reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
                });
            }
        };
    }
    onLoadedFile.$inject = ["$parse"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('download-data', []).directive('downloadData', downloadData);

    var idAppendix = 0;

    function downloadData($q) {
        return {
            restrict: 'EA',
            scope: {
                getData: '&ddGetter',
                json: '@ddJson',
                encoding: '@ddEncoding',
                type: '@ddType',
                filename: '=ddFilename'
            },
            link: link
        };

        function link(scope, element) {
            element.on('click', createAndDownload);

            function createAndDownload() {
                $q.when(scope.getData(), function (data) {

                    var type = scope.type;
                    if (scope.json === "true") {
                        data = JSON.stringify(data, null, 2);
                        type = type || 'application/json';
                    }
                    type = type || 'text/plain';
                    if (scope.encoding === 'utf8') {
                        data = '﻿' + data;
                    }

                    var blob = new Blob([data], { type: type });
                    var url = URL.createObjectURL(blob);
                    var elementId = 'ngDataDownload' + idAppendix++;

                    var newElem = angular.element('<a ' + 'style="display:none" ' + 'id="' + elementId + '" ' + 'href="' + url + '" download="' + scope.filename + '">' + 'test' + '</a>');

                    angular.element('body').append(newElem);
                    document.getElementById(elementId).click();
                    newElem.remove();
                });
            }
        }
    }
    downloadData.$inject = ["$q"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').constant('constants', {
        githubUrl: 'https://github.com/palortoff/d3-item-manager',
        gameSeason: 4,
        aboutVersion: "1"
    });
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').config(["$routeProvider", function ($routeProvider) {

        $routeProvider.when('/', {
            redirectTo: '/items'
        }).when('/items', {
            templateUrl: 'routes/items/items.template.html',
            controller: 'ItemsController',
            controllerAs: 'vm',
            resolve: { factory: checkRouting }
        }).when('/about', {
            templateUrl: 'routes/about/about.template.html',
            controller: 'AboutController',
            controllerAs: 'vm'
        }).when('/config', {
            templateUrl: 'routes/config/config.template.html',
            controller: 'ConfigController',
            controllerAs: 'vm',
            resolve: { factory: checkRouting }
        });
    }]);

    function checkRouting($location, about) {
        if (!about.hasBeenSeen()) {
            $location.path('/about');
        }
    }
    checkRouting.$inject = ["$location", "about"];
})();
'use strict';

(function () {
  'use strict';

  angular.module('d3-item-manager').factory('about', about);

  function about(config, constants) {
    return {
      hasBeenSeen: hasBeenSeen
    };

    function hasBeenSeen() {
      return config.getItem('aboutSeen') === constants.aboutVersion;
    }
  }
  about.$inject = ["config", "constants"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').factory('classes', classes);

    var keyCurrent = 'currentClass';

    var _all = [{ id: 0, displayName: 'All' }, { id: 6, name: 'barbarian', displayName: 'Barbarian' }, { id: 3, name: 'crusader', displayName: 'Crusader' }, { id: 2, name: 'demon-hunter', displayName: 'Demon Hunter' }, { id: 1, name: 'monk', displayName: 'Monk' }, { id: 4, name: 'witch-doctor', displayName: 'Witch Doctor' }, { id: 5, name: 'wizard', displayName: 'Wizard' }];

    function classes(config) {
        var _current = Number(config.getItem(keyCurrent)) || 0;

        return {
            all: all,
            distinct: distinct,
            current: current,
            setCurrent: setCurrent
        };

        function current() {
            return _.find(all(), function (c) {
                return c.id === _current;
            });
        }

        function all() {
            return _all;
        }

        function distinct() {
            return _all.filter(function (c) {
                return c.id !== 0;
            });
        }

        function setCurrent(id) {
            _current = id;
            config.setItem(keyCurrent, id);
        }
    }
    classes.$inject = ["config"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').factory('columns', columns);

    var keyAll = 'allColumns';

    // TODO: add cubed to array

    function columns(config) {
        var _all = config.getItem(keyAll, ['Stashed']);

        return {
            remove: remove,
            add: add,
            all: all,
            reallyAll: reallyAll
        };

        function reallyAll() {
            return _.flatten(['Cubed', all()]);
        }

        function all() {
            return _all;
        }

        function remove(gm) {
            _all = _all.filter(function (item) {
                return item !== gm;
            });
            save();
        }

        function add(gm) {
            if (_.contains(_all, gm)) {
                return;
            }
            _all.push(gm);
            save();
        }

        function save() {
            config.setItem(keyAll, _all);
        }
    }
    columns.$inject = ["config"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').factory('gameModes', gameModes);

    var keyAll = 'allGameModes';
    var keyCurrent = 'currentGameMode';

    function gameModes(config) {
        var _all = config.getItem(keyAll, ['Softcore', 'Hardcore']);
        var _current = config.getItem(keyCurrent, _all[0]);

        return {
            current: current,
            setCurrent: setCurrent,
            remove: remove,
            add: add,
            all: all
        };

        function current() {
            return _current;
        }

        function all() {
            return _all;
        }

        function setCurrent(c) {
            _current = c;
            config.setItem(keyCurrent, c);
        }

        function setDefault() {
            if (!_.find(_all, current)) {
                setCurrent(_all[0]);
            }
        }

        function remove(gm) {
            _all = _all.filter(function (item) {
                return item !== gm;
            });
            setDefault();
            save();
        }

        function add(gm) {
            if (_.contains(_all, gm)) {
                return;
            }
            _all.push(gm);
            save();
        }

        function save() {
            config.setItem(keyAll, JSON.stringify(_all));
        }
    }
    gameModes.$inject = ["config"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').factory('isEndGame', isEndGame);

    function isEndGame() {
        return function (item) {
            if (item.crafted && item.setItem) {
                return item.requiredLevel === 70;
            }
            return true;
        };
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').factory('isItemVisibleForClass', isItemVisibleForClass);

    function isItemVisibleForClass(classes, $http) {

        var itemTypeClass;
        var isLoaded = false;

        $http.get('items/itemTypeClass.json?' + Date.now()).then(function (result) {
            itemTypeClass = result.data;
            isLoaded = true;
        });

        return function (item) {
            if (!isLoaded) {
                return false;
            }

            if (classes.current().id === 0) {
                return true;
            }

            var itemVisibility = isItemVisible(item);
            if (itemVisibility === false) {
                return false;
            }
            if (itemVisibility === true) {
                return true;
            }

            return isItemTypeVisible(item);
        };

        function isItemVisible(item) {
            if (item.classes) {
                return _.contains(item.classes, classes.current().name);
            }
            return undefined;
        }

        function isItemTypeVisible(item) {
            if (itemTypeClass[item.type.id]) {
                return _.contains(itemTypeClass[item.type.id], classes.current().name);
            }

            return true;
        }
    }
    isItemVisibleForClass.$inject = ["classes", "$http"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').factory('isItemVisibleForCategory', isItemVisibleForCategory);

    function isItemVisibleForCategory(itemCategory) {
        return function (item) {
            return itemCategory.current().filter(item);
        };
    }
    isItemVisibleForCategory.$inject = ["itemCategory"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').factory('items', items);

    function items($http, locales) {
        return {
            load: load
        };

        // TODO: don't load them new all the time

        function load() {
            var locale = locales.currentItemLanguage().id;
            return $http.get('items/items_' + locale + '.json?' + Date.now()).then(function (result) {
                return result.data;
            });
        }
    }
    items.$inject = ["$http", "locales"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').factory('itemCategory', itemCategory);

    var key = 'itemCategory';

    function itemCategory(config) {
        var selected = config.getItem(key) || 1;

        return {
            all: all,
            getCategory: getCategory,
            current: current,
            set: set
        };

        function set(s) {
            if (!_.isUndefined(s)) {
                selected = s;
                config.setItem(key, s);
            }
        }

        function getCategory(id) {
            return categoryById(id);
        }

        function current() {
            return categoryById(selected);
        }

        function categoryById(id) {
            return _.find(all, function (cat) {
                return cat.id == id; // jshint ignore:line
            });
        }
    }
    itemCategory.$inject = ["config"];

    var all = [{ id: 1, name: "Cube: Weapons", filter: function filter(item) {
            return item.cube && item.cubeCategory === "Weapon";
        } }, { id: 2, name: "Cube: Armor", filter: function filter(item) {
            return item.cube && item.cubeCategory === "Armor";
        } }, { id: 3, name: "Cube: Jewelry", filter: function filter(item) {
            return item.cube && item.cubeCategory === "Jewelry";
        } }, { "class": "divider" }, { id: 4, name: 'Horadric Cache Items', filter: function filter(item) {
            return !!item.bounty;
        } }, { id: 5, name: 'Season 1', filter: function filter(item) {
            return item.season === 1;
        }, "class": 'hide' }, { id: 6, name: 'Season 2', filter: function filter(item) {
            return item.season === 2;
        }, "class": 'hide' }, { id: 7, name: 'Season 3', filter: function filter(item) {
            return item.season === 3;
        }, "class": 'hide' }, { id: 8, name: 'Season 4', filter: function filter(item) {
            return item.season === 4;
        } }, { "class": "divider" }, { id: 9, name: 'Crafted (Legendary)', filter: function filter(item) {
            return item.crafted && item.displayColor === "orange" && item.requiredLevel === 70;
        }, "class": 'hide' }, { id: 10, name: 'Crafted (Set)', filter: function filter(item) {
            return item.crafted && item.displayColor === "green" && item.requiredLevel === 70;
        }, "class": 'hide' }, { "class": "divider hide" }, { id: 11, name: "Neck", filter: function filter(item) {
            return _.contains(item.slots, 'neck');
        } }, { id: 12, name: "Finger", filter: function filter(item) {
            return _.contains(item.slots, 'left-finger');
        } }, { id: 13, name: "Head", filter: function filter(item) {
            return _.contains(item.slots, 'head');
        } }, { id: 14, name: "Torso", filter: function filter(item) {
            return _.contains(item.slots, 'chest');
        } }, { id: 15, name: "Waist", filter: function filter(item) {
            return _.contains(item.slots, 'waist');
        } }, { id: 16, name: "Legs", filter: function filter(item) {
            return _.contains(item.slots, 'legs');
        } }, { id: 17, name: "Feet", filter: function filter(item) {
            return _.contains(item.slots, 'feet');
        } }, { id: 18, name: "Shoulder", filter: function filter(item) {
            return _.contains(item.slots, 'shoulder');
        } }, { id: 19, name: "Hands", filter: function filter(item) {
            return _.contains(item.slots, 'hands');
        } }, { id: 20, name: "Bracers", filter: function filter(item) {
            return _.contains(item.slots, 'bracers');
        } }, { id: 21, name: "Weapon (1H)", filter: function filter(item) {
            return _.contains(item.slots, 'left-hand') && !item.type.twoHanded;
        } }, { id: 22, name: "Weapon (2H)", filter: function filter(item) {
            return _.contains(item.slots, 'left-hand') && item.type.twoHanded;
        } }, { id: 23, name: "Off-Hand", filter: function filter(item) {
            return _.contains(['Shield', 'CrusaderShield', 'Quiver', 'Mojo', 'Orb'], item.type.id);
        } }, { id: 24, name: "Follower", filter: function filter(item) {
            return _.contains(item.slots, 'follower-special');
        } }, { "class": 'divider hide' }, { id: 25, name: "Items with data loss before v1.3.8", filter: function filter(item) {
            return _.contains([10161, 10162, 10261, 10262, 10361, 10362, 10461, 10462, 10561, 10562, 10661, 10662, 10761, 10762, 10861, 10862, 10961, 10962, 11061, 11062], item.id);
        }, "class": 'hide' }, { "class": 'divider hide' }];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').factory('seasons', seasons);

    var keyAll = 'allSeasons';
    var keyCurrent = 'currentSeason';

    // TODO: add non-season to array

    function seasons(config) {
        var _all = config.getItem(keyAll, ['Season 4']);
        var _current = config.getItem(keyCurrent, "Non Season");

        return {
            current: current,
            setCurrent: setCurrent,
            remove: remove,
            add: add,
            all: all,
            reallyAll: reallyAll
        };

        function reallyAll() {
            return _.flatten(['Non Season', all()]);
        }

        function current() {
            return _current;
        }

        function all() {
            return _all;
        }

        function setCurrent(c) {
            _current = c;
            config.setItem(keyCurrent, c);
        }

        function setDefault() {
            if (!_.find(_all, current)) {
                setCurrent(_all[0]);
            }
        }

        function remove(gm) {
            _all = _all.filter(function (item) {
                return item !== gm;
            });
            setDefault();
            save();
        }

        function add(gm) {
            if (_.contains(_all, gm)) {
                return;
            }
            _all.push(gm);
            save();
        }

        function save() {
            config.setItem(keyAll, JSON.stringify(_all));
        }
    }
    seasons.$inject = ["config"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').factory('version', version);

    function version($http) {
        return {
            get: getVersion
        };

        function getVersion() {
            return $http.get('version.json?' + Date.now()).then(function (result) {
                return result.data;
            });
        }
    }
    version.$inject = ["$http"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').directive('bannerAlert', bannerAlert);

    function bannerAlert() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'directives/bannerAlert/bannerAlert.template.html'
        };
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').directive('itemFilter', itemFilter);

    function itemFilter() {
        return {
            restrict: 'E',

            scope: {
                filterValue: '=',
                filterOverAll: '=',
                onlyCubable: '=',
                hideCubed: '='
            },
            bindToController: true,
            templateUrl: 'directives/itemFilter/itemFilter.template.html',
            controller: controller,
            controllerAs: 'vm'
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
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').controller('NavBarController', NavBarController);

    function NavBarController(classes, gameModes, seasons, itemCategory) {
        var vm = this;

        vm.gameModes = gameModes;
        vm.seasons = seasons;
        vm.classes = classes;
        vm.itemCategory = itemCategory;
    }
    NavBarController.$inject = ["classes", "gameModes", "seasons", "itemCategory"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').directive('navBar', function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/navbar/navbar.template.html',
            scope: {},
            controller: 'NavBarController',
            controllerAs: 'vm'
        };
    });
})();
'use strict';

(function () {
  'use strict';

  angular.module('d3-item-manager').directive('newFeatures', newFeatures);

  function newFeatures() {
    controller.$inject = ["$location", "config"];
    return {
      restrict: 'E',
      templateUrl: 'directives/newFeatures/newFeatures.template.html',
      scope: {},
      controller: controller,
      controllerAs: 'vm'
    };

    function controller($location, config) {
      var vm = this; // jshint ignore:line

      vm.itemLanguageNotConfigured = itemLanguageNotConfigured;
      vm.showConfig = showConfig;
      vm.setDefaultItemLanguage = setDefaultItemLanguage;

      function itemLanguageNotConfigured() {
        return !config.isSet('itemLanguage');
      }

      function showConfig() {
        $location.path('/config');
      }

      function setDefaultItemLanguage() {
        config.setItem('itemLanguage', 'en_GB');
      }
    }
  }
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').controller('AboutController', AboutController);

    var key = 'aboutSeen';
    function AboutController($location, constants, version, config) {
        var vm = this;
        vm.constants = constants;
        vm.dismiss = dismiss;
        vm.version = '';

        version.get().then(function (version) {
            vm.version = version.version;
        });

        function dismiss() {
            config.setItem(key, constants.aboutVersion);
            $location.path('/');
        }
    }
    AboutController.$inject = ["$location", "constants", "version", "config"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').controller('ConfigController', ConfigController);

    function ConfigController($location, gameModes, columns, itemCategory, locales, backup, restore, exportService) {
        var vm = this;
        vm.gameModes = gameModes;
        vm.addNewGameMode = addNewGameMode;
        vm.columns = columns;
        vm.addNewColumn = addNewColumn;
        vm.locales = locales;
        vm.dismiss = dismiss;
        vm.showCategory = showCategory;
        vm.backupData = backup.data;
        vm.triggerRestore = restore.trigger;
        vm.exportData = exportService.data;

        function addNewGameMode() {
            gameModes.add(vm.newGameMode);
            vm.newGameMode = '';
        }

        function addNewColumn() {
            columns.add(vm.newColumn);
            vm.newColumn = '';
        }

        function dismiss() {
            $location.path('/');
        }

        function showCategory(id) {
            itemCategory.set(id);
            $location.path('/items');
        }
    }
    ConfigController.$inject = ["$location", "gameModes", "columns", "itemCategory", "locales", "backup", "restore", "exportService"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').controller('ItemsController', ItemsController);

    function ItemsController($scope, items, itemTracking, isItemVisibleForCategory, isItemVisibleForClass, gameModes, seasons, columns, itemCategory, constants, isEndGame, locales, config) {
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
            items.load().then(function (data) {
                vm.items = data;
            }).then(itemTracking.get).then(addTracking);
        }

        function addTracking(tracking) {
            vm.items.forEach(function (item) {
                if (!tracking[item.id]) {
                    tracking[item.id] = {};
                }
                item.track = tracking[item.id];
            });
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
            } catch (e) {
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
            if (!isEndGame(item)) {
                return false;
            }

            if (vm.filterOverAll && vm.itemFilter.length > 0) {
                return true;
            }

            if (vm.onlyCubable && !item.cube) {
                return false;
            }
            if (vm.hideCubed && isCubed(item)) {
                return false;
            }

            if (!isItemVisibleForCategory(item)) {
                return false;
            }

            return isItemVisibleForClass(item);
        }

        function isSeasonal(item) {
            return item.season === constants.gameSeason;
        }

        function isBounty(item) {
            return !!item.bounty;
        }

        function bountyTitle(item) {
            return isBounty(item) ? 'Act ' + item.bounty.act : '';
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
            var locale = locales.currentItemLanguage();
            return 'http://' + locale.region + '.battle.net/d3/' + locale.short + '/' + artisan + item.tooltipParams;
        }

        function persist(key) {
            vm[key] = config.getItem(key) === true || false;

            $scope.$watch(getKey, function () {
                config.setItem(key, vm[key]);
            });

            function getKey() {
                return vm[key];
            }
        }
    }
    ItemsController.$inject = ["$scope", "items", "itemTracking", "isItemVisibleForCategory", "isItemVisibleForClass", "gameModes", "seasons", "columns", "itemCategory", "constants", "isEndGame", "locales", "config"];
})();
'use strict';

(function () {
  'use strict';

  angular.module('d3-item-manager').factory('config', config);

  var localStorageKey = 'config';
  var _config = JSON.parse(localStorage.getItem(localStorageKey)) || {};

  function config(configUpdate) {
    var service = {
      getItem: getItem,
      setItem: setItem,
      isSet: isSet,
      getCompleteConfig: getCompleteConfig,
      setCompleteConfigReloadRequired: setCompleteConfigReloadRequired
    };
    configUpdate(service);
    return service;

    function getItem(itemKey, defaultValue) {
      return _config[itemKey] || defaultValue;
    }

    function setItem(itemKey, value) {
      _config[itemKey] = value;
      save();
    }

    function isSet(itemKey) {
      return !_.isUndefined(_config[itemKey]);
    }

    function get() {
      return _config;
    }

    function save() {
      localStorage.setItem(localStorageKey, JSON.stringify(_config));
    }
    function getCompleteConfig() {
      return _config;
    }
    function setCompleteConfigReloadRequired(c) {
      _config = c;
      save();
    }
  }
  config.$inject = ["configUpdate"];
})();

// TODO: page to manually edit/delete all config values
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').factory('configUpdate', configUpdate);

    var config;

    function configUpdate() {
        return update;

        function update(c) {
            config = c;
            moveToConfig('aboutSeen');
            moveToConfig('filterOverAll');
            moveToConfig('onlyCubable');
            moveToConfig('hideCubed');
            moveToConfig('currentClass');
            moveToConfig('allColumns', JSON.parse);
            moveToConfig('allGameModes', JSON.parse);
            moveToConfig('currentGameMode');
            moveToConfig('itemCategory');
            moveToConfig('allSeasons', JSON.parse);
            moveToConfig('currentSeason');

            removeFromLocalStorage('armor_backup');
            removeFromLocalStorage('jewls_backup');
            removeFromLocalStorage('weapons_backup');
            removeFromLocalStorage('disclaimerRead');
            removeFromLocalStorage('section');
            removeFromLocalStorage('showOptions');
        }

        function moveToConfig(key) {
            var convert = arguments.length <= 1 || arguments[1] === undefined ? identity : arguments[1];

            if (localStorage.getItem(key)) {
                var value = localStorage.getItem(key);
                config.setItem(key, convert(value));
                localStorage.removeItem(key);
            }
        }

        function identity(v) {
            return v;
        }

        function removeFromLocalStorage(key) {
            localStorage.removeItem(key);
        }
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').factory('locales', locales);

    var itemLanguageKey = 'itemLanguage';

    function locales(config) {
        return {
            all: all,
            currentItemLanguage: currentItemLanguage, // TODO: rename to locale
            setItemLanguageById: setItemLanguageById
        };

        function currentItemLanguage() {
            var id = config.getItem(itemLanguageKey, 'en_GB');
            return _.find(allLocales, function (l) {
                return l.id === id;
            });
        }

        function all() {
            return allLocales;
        }

        function setItemLanguageById(id) {
            config.setItem(itemLanguageKey, id);
        }
    }
    locales.$inject = ["config"];

    var allLocales = [{
        id: "en_GB",
        name: "English",
        short: 'en',
        region: 'eu'
    }, {
        id: "de_DE",
        name: "German",
        short: 'de',
        region: 'eu'
    }, {
        id: "es_ES",
        name: "Spanish",
        short: 'es',
        region: 'eu'
    }, {
        id: "fr_FR",
        name: "French",
        short: 'fr',
        region: 'eu'
    }, {
        id: "it_IT",
        name: "Italian",
        short: 'it',
        region: 'eu'
    }, {
        id: "pl_PL",
        name: "Polish",
        short: 'pl',
        region: 'eu'
    }, {
        id: "pt_PT",
        name: "Portuguese",
        short: 'pt',
        region: 'eu'
    }, {
        id: "ru_RU",
        name: "Russian",
        short: 'ru',
        region: 'eu'
    }, {
        id: "kr_KR",
        name: "Korean (South Korea)",
        short: 'kr',
        region: 'kr'
    }, {
        id: "sh_TW",
        name: "Traditional Chinese",
        short: 'tw',
        region: 'tw'
    }];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').factory('itemTracking', itemTracking);

    var key = 'itemTracking';

    function itemTracking($timeout, upgradeDataStructureBeforeItemLoad, itemTrackingUpgrade) {
        var tracking;
        var notifyTimer;
        return {
            get: get,
            save: save,
            setCompleteTrackingReloadRequired: setCompleteTrackingReloadRequired
        };

        function get() {
            if (!tracking) {
                load();
            }
            return tracking;
        }
        function load() {
            upgradeDataStructureBeforeItemLoad();
            tracking = JSON.parse(localStorage.getItem(key)) || {};
            itemTrackingUpgrade(tracking, saveWithoutToastr);
        }

        function saveWithoutToastr() {
            localStorage.setItem(key, JSON.stringify(tracking));
        }

        function save() {
            notifySave();
            saveWithoutToastr();
        }

        function notifySave() {
            $timeout.cancel(notifyTimer);
            notifyTimer = $timeout(function () {
                toastr.success('Items saved', { timeOut: 1000 });
            }, 1000);
        }
        function setCompleteTrackingReloadRequired(t) {
            tracking = t;
            saveWithoutToastr();
        }
    }
    itemTracking.$inject = ["$timeout", "upgradeDataStructureBeforeItemLoad", "itemTrackingUpgrade"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').factory('itemTrackingUpgrade', itemTrackingUpgrade);

    var tracking;
    var saveFn;
    var configKey = 'itemTrackingVersion';

    function itemTrackingUpgrade(config, itemTrackingUpgrade_001, itemTrackingUpgrade_002) {
        return function (t, s) {
            tracking = t;
            saveFn = s;
            runUpdates();
        };

        function runUpdates() {
            runUpdate(1, itemTrackingUpgrade_001);
            runUpdate(2, itemTrackingUpgrade_002);
        }

        function runUpdate(version, fn) {
            if (currentVersion() < version) {
                console.log('running itemTracking upgrade ' + version);
                fn(tracking, saveFn);
                updateCurrentVersion(version);
            } else {
                console.log('skipping itemTracking upgrade ' + version);
            }
        }

        function currentVersion() {
            return Number(config.getItem(configKey, 0));
        }

        function updateCurrentVersion(version) {
            config.setItem(configKey, version);
        }
    }
    itemTrackingUpgrade.$inject = ["config", "itemTrackingUpgrade_001", "itemTrackingUpgrade_002"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').factory('itemTrackingUpgrade_001', removeDataForDuplicateIdsWithContent);

    function removeDataForDuplicateIdsWithContent(itemCategory) {
        var tracking;
        var save;
        return function (trackingData, saveFn) {
            tracking = trackingData;
            save = saveFn;
            removeDuplicateItemsIds();
        };

        function removeDuplicateItemsIds() {
            var hasBadData = _.chain(tracking).filter(itemHasBadId).filter(itemHasDataStored).value().length > 0;

            if (hasBadData) {
                notifyForBadData();
                removeBadData();
                save();
            }
        }

        function notifyForBadData() {
            itemCategory.set(25);
            toastr.error('You had items stored that conflicted with other items. Please check the displayed list of items.', 'Data loss detected', { timeOut: 0 });
        }

        function removeBadData() {
            _.forEach([1016, 1026, 1036, 1046, 1056, 1066, 1076, 1086, 1096, 1106], function (id) {
                delete tracking[id];
            });
        }

        //noinspection JSUnusedLocalSymbols
        function itemHasBadId(item, key) {
            switch (key) {
                case "1016":
                case "1026":
                case "1036":
                case "1046":
                case "1056":
                case "1066":
                case "1076":
                case "1086":
                case "1096":
                case "1106":
                    return true;
                default:
                    return false;
            }
        }

        function itemHasDataStored(item) {
            var s = item.hasOwnProperty('Softcore');
            var h = item.hasOwnProperty('Hardcore');
            return s || h;
        }
    }
    removeDataForDuplicateIdsWithContent.$inject = ["itemCategory"];
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').factory('itemTrackingUpgrade_002', removeEntriesForDuplicateIds);

    function removeEntriesForDuplicateIds() {
        return function (tracking, save) {
            removeBadData(tracking);
            save();
        };

        function removeBadData(tracking) {
            _.forEach([1016, 1026, 1036, 1046, 1056, 1066, 1076, 1086, 1096, 1106], function (id) {
                delete tracking[id];
            });
        }
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('d3-item-manager').factory('upgradeDataStructureBeforeItemLoad', upgradeDataStructureBeforeItemLoad);

    var key = 'itemTracking';

    function upgradeDataStructureBeforeItemLoad() {
        var tracking;
        return function () {
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
        };

        function save() {
            localStorage.setItem(key, JSON.stringify(tracking));
        }
    }
})();
//# sourceMappingURL=app.js.map
