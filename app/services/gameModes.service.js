(function() {
    'use strict';

    angular.module('d3-item-manager').factory('gameModes', gameModes);

    function gameModes() {
        var all = JSON.parse(localStorage.getItem('gameModes')) || ['Softcore', 'Hardcore'];
        var current = localStorage.getItem('gameMode') || all[0];

        return {
            all:     all,
            current: function() {return current;},
            set:     set,
            remove:  remove,
            add:     add,

            allGameModes: allGameModes
        };

        function allGameModes(){
            return all;
        }

        function set(c) {
            current = c;
            localStorage.setItem('gameMode', c)
        }

        function remove(gm) {
            all = all.filter(function(item){return item !== gm;});
            if (!_.find(all, current)){
                set(all[0]);
            }
            save();
        }

        function add(gm){
            if (_.contains(all, gm)) return;
            all.push(gm);
            save();
        }

        function save(){
            localStorage.setItem('gameModes', JSON.stringify(all));
        }
    }

})();