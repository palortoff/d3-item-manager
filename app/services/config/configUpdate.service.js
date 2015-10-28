(function() {
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

        function moveToConfig(key, convert = identity) {
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
