(function() {
    'use strict';

    angular.module('d3-item-manager').factory('seasons', seasons);

    var all = ['non-season','season'];
    var current = all[0];

    var key = 'season';
    function seasons() {
        current = localStorage.getItem(key) || all[0];

        return {
            all:     all,
            current: function(){return current;},
            set:     set
        };

        function set(c) {
            current = c;
            localStorage.setItem(key, c)
        }
    }

})();