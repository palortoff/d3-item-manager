(function() {
    'use strict';

    angular.module('d3-item-manager').factory('itemCategory', itemCategory);

    var categories = {
        0:{
            "class":"divider"
        },
        1: {
            name: "Cube: Weapons",
            filter: function(item){
                return item.cube && item.cubeCategory === "Weapon";
            }
        },
        2: {
            name: "Cube: Armor",
            filter: function(item){
                return item.cube && item.cubeCategory === "Armor";
            }
        },
        3:{
            name: "Cube: Jewelry",
            filter: function(item){
                return item.cube && item.cubeCategory === "Jewelry";
            }
        },
        4:{
            name: 'other...'
        }
    };

    var selectionOrder=[1,2,3];

    var current;
    var key='itemCategory';

    function itemCategory(){
        current = localStorage.getItem(key) || 1;

        return {
            all: categories,
            current: function(){return categories[current];},
            getCategory: function(id){return categories[id]},
            selectionOrder: selectionOrder,
            set: set
        };

        function set(s){
            current = s;
            localStorage.setItem(key, s)
        }
    }

})();