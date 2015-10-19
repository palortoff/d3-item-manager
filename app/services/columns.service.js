(function() {
    'use strict';

    angular.module('d3-item-manager').factory('columns', columns);

    var keyAll = 'allColumns';

    function columns(config) {
        var _all = config.getItem(keyAll, ['Stashed']) ;

        return {
            remove,
            add,
            all
        };

        function all() {
            return _all;
        }

        function remove(gm) {
            _all = _all.filter(function(item) {return item !== gm;});
            save();
        }

        function add(gm) {
            if (_.contains(_all, gm)) {return;}
            _all.push(gm);
            save();
        }

        function save() {
            config.setItem(keyAll, JSON.stringify(_all));
        }
    }

})();