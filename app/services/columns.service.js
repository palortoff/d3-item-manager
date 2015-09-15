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