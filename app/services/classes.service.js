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
            all,
            distinct,
            current,
            setCurrent
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