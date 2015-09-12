(function() {
    'use strict';
    // TODO: item.isSeasonal with show/hide switch

    // TODO: merge seasonal into main

    // TODO: readme.md
    angular.module('d3-item-manager').controller('EditorController', EditorController);

    function EditorController($q, loadItems, sections, isItemVisible, classes) {
        var vm = this;

        vm.isVisible = isItemVisible;

        vm.sections = sections.all;
        vm.section = sections.current;

        vm.toggleVisibility = toggleVisibility;

        init();

        function init() {
            sections.all.forEach(function(section) {load(section)});
        }



        function load(section) {
            _loadItems(section).
                then(function(data) {
                    vm[section] = data;
                }).
                then(addVisibility.bind(null, section));
        }

        function _loadItems(section){
            var data = localStorage.getItem('json_' + section);
            if (data){
                data = JSON.parse(data);
                return $q.when(data);
            }
            else{
                return loadItems(section);
            }
        }

        function addVisibility(section) {
            vm[section].forEach(function(item) {
                if (!item.classes) {
                    item.classes = [];
                }
            })
        }

        function toggleVisibility(item) {
            if (isItemVisible(item)) {
                item.classes = item.classes.filter(function(c){return c != classes.current();});
            }
            else {
                item.classes.push(classes.current());
            }

            saveSection();
        }

        function saveSection(){
            localStorage.setItem('json_' + sections.current(), JSON.stringify(vm[sections.current()]));
        }
    }

})();