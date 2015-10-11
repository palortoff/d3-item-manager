(function() {
    'use strict';

    angular.module('d3-item-manager').factory('classes', classes);

    var keyCurrent = 'currentClass';

    var _all = [
        {id: 0, displayName: 'All'},
        {id: 6, name: 'barbarian', displayName: 'Barbarian'},
        {id: 3, name: 'crusader', displayName: 'Crusader'},
        {id: 2, name: 'demon-hunter', displayName: 'Demon Hunter'},
        {id: 1, name: 'monk', displayName: 'Monk'},
        {id: 4, name: 'witch-doctor', displayName: 'Witch Doctor'},
        {id: 5, name: 'wizard', displayName: 'Wizard'}
    ];
    var _current = Number(localStorage.getItem(keyCurrent)) || 0;

    function classes() {
        return {
            all,
            distinct,
            current,
            setCurrent
        };

        function current() {
            return _.find(all(), function(c) {return c.id === _current;});
        }

        function all() {
            return _all;
        }

        function distinct() {
            return _all.filter(function(c) {return c.id !== 0;});
        }

        function setCurrent(id) {
            _current = id;
            localStorage.setItem(keyCurrent, id);
        }
    }

})();