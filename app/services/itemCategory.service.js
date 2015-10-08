(function() {
    'use strict';

    angular.module('d3-item-manager').factory('itemCategory', itemCategory);

    var key = 'itemCategory';

    function itemCategory() {
        var selected = localStorage.getItem(key) || 1;

        return {
            all,
            getCategory,
            current,
            set
        };

        function set(s) {
            selected = s;
            localStorage.setItem(key, s)
        }

        function getCategory(id) {
            return categoryById(id);
        }

        function current() {
            return categoryById(selected);
        }

        function categoryById(id) {
            return _.find(all, function(cat) {
                return cat.id == id
            });
        }
    }

    var all = [
        {id: 1, name: "Cube: Weapons", filter: function(item) {return item.cube && item.cubeCategory === "Weapon";}},
        {id: 2, name: "Cube: Armor", filter: function(item) {return item.cube && item.cubeCategory === "Armor";}},
        {id: 3, name: "Cube: Jewelry", filter: function(item) { return item.cube && item.cubeCategory === "Jewelry"; }},

        {"class": "divider"},

        {id: 4, name: 'Horadric Cache Items', filter: function(item) { return !!item.bounty; }},
        {id: 5, name: 'Season 1', filter: function(item) { return item.season == 1; }, "class": 'hide'},
        {id: 6, name: 'Season 2', filter: function(item) { return item.season == 2; }, "class": 'hide'},
        {id: 7, name: 'Season 3', filter: function(item) { return item.season == 3; }, "class": 'hide'},
        {id: 8, name: 'Season 4', filter: function(item) { return item.season == 4; }},

        {"class": "divider"},

        {id: 9, name: 'Crafted (Legendary)', filter: function(item) { return item.crafted && item.displayColor === "orange" && item.requiredLevel == 70; }, "class": 'hide'},
        {id: 10, name: 'Crafted (Set)', filter: function(item) { return item.crafted && item.displayColor === "green" && item.requiredLevel == 70; }, "class": 'hide'},

        {"class": "divider hide"},

        {id: 11, name: "Neck", filter: function(item) { return _.contains(item.slots, 'neck'); }},
        {id: 12, name: "Finger", filter: function(item) { return _.contains(item.slots, 'left-finger'); }},
        {id: 13, name: "Head", filter: function(item) {return _.contains(item.slots, 'head'); }},
        {id: 14, name: "Torso", filter: function(item) {return _.contains(item.slots, 'chest');}},
        {id: 15, name: "Waist", filter: function(item) {return _.contains(item.slots, 'waist');}},
        {id: 16, name: "Legs", filter: function(item) {return _.contains(item.slots, 'legs');}},
        {id: 17, name: "Feet", filter: function(item) {return _.contains(item.slots, 'feet');}},
        {id: 18, name: "Shoulder", filter: function(item) {return _.contains(item.slots, 'shoulder');}},
        {id: 19, name: "Hands", filter: function(item) {return _.contains(item.slots, 'hands');}},
        {id: 20, name: "Bracers", filter: function(item) {return _.contains(item.slots, 'bracers');}},
        {id: 21, name: "Weapon (1H)", filter: function(item) {return _.contains(item.slots, 'left-hand') && !item.type.twoHanded; }},
        {id: 22, name: "Weapon (2H)", filter: function(item) {return _.contains(item.slots, 'left-hand') && item.type.twoHanded;}},
        {id: 23, name: "Off-Hand", filter: function(item) {return _.contains(['Shield', 'CrusaderShield', 'Quiver', 'Mojo', 'Orb'], item.type.id);}},
        {id: 24, name: "Follower", filter: function(item) {return _.contains(item.slots, 'follower-special');}},

        {"class": 'divider hide'},
        {id: 25, name:"Items with data loss before v1.3.8", filter: function(item){return _.contains([10161, 10162,10261, 10262,10361, 10362,10461, 10462,10561, 10562,10661, 10662,10761, 10762,10861, 10862,10961, 10962,11061, 11062], item.id);}, "class": 'hide'},
        {"class": 'divider hide'}
    ];

})();