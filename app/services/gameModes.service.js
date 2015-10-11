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
            localStorage.setItem(keyCurrent, c);
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
            if (_.contains(_all, gm)) {return;}
            _all.push(gm);
            save();
        }

        function save() {
            localStorage.setItem(keyAll, JSON.stringify(_all));
        }
    }

})();