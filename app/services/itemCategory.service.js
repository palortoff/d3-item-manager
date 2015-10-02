(function() {
    'use strict';

    angular.module('d3-item-manager').factory('itemCategory', itemCategory);

    var categories = {
        0:  {
            "class": "divider"
        },
        1:  {
            name:   "Cube: Weapons",
            filter: function(item) {
                return item.cube && item.cubeCategory === "Weapon";
            }
        },
        2:  {
            name:   "Cube: Armor",
            filter: function(item) {
                return item.cube && item.cubeCategory === "Armor";
            }
        },
        3:  {
            name:   "Cube: Jewelry",
            filter: function(item) {
                return item.cube && item.cubeCategory === "Jewelry";
            }
        },
        4:  {
            name:   'Horadric Cache Items',
            filter: function(item) {
                return !!item.bounty;
            }
        },
        5:  {
            name:   'Season 1',
            filter: function(item) {
                return item.season == 1;
            }
        },
        6:  {
            name:   'Season 2',
            filter: function(item) {
                return item.season == 2;
            }
        },
        7:  {
            name:   'Season 3',
            filter: function(item) {
                return item.season == 3;
            }
        },
        8:  {
            name:   'Season 4',
            filter: function(item) {
                return item.season == 4;
            }
        },
        9:  {
            name:   'Crafted (Legendary)',
            filter: function(item) {
                return item.crafted && item.displayColor === "orange" && item.requiredLevel == 70;
            }
        },
        10: {
            name:   'Crafted (Set)',
            filter: function(item) {
                return item.crafted && item.displayColor === "green" && item.requiredLevel == 70;
            }
        }
    };

    var selectionOrder = [1, 2, 3, -1, 4, 8, 9, 10];

    var current;
    var key = 'itemCategory';

    function itemCategory() {
        current = localStorage.getItem(key) || 1;

        return {
            all:            categories,
            current:        function() {return categories[current];},
            getCategory:    function(id) {return (id <= 0) ? categories[0] : categories[id]},
            selectionOrder: selectionOrder,
            set:            set
        };

        function set(s) {
            current = s;
            localStorage.setItem(key, s)
        }
    }

})();