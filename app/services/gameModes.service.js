(function() {
    'use strict';

    angular.module('d3-item-manager').factory('gameModes', gameModes);

    var all = ['softcore','hardcore'];
    var current = all[0];

    function gameModes() {
        current = localStorage.getItem('gameMode') || all[0];

        return {
            all:     all,
            current: function(){return current;},
            set:     set
        };

        function set(c) {
            current = c;
            localStorage.setItem('gameMode', c)
        }
    }

})();