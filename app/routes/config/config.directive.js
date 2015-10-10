(function() {
    'use strict';

    angular.module('d3-item-manager').controller('ConfigController', ConfigController);

    function ConfigController($location, gameModes, columns, itemCategory, d3Config, config) {
        var vm = this;
        vm.gameModes = gameModes;
        vm.addNewGameMode = addNewGameMode;

        vm.columns = columns;
        vm.addNewColumn = addNewColumn;
        vm.d3Config = d3Config;

        vm.dismiss = dismiss;

        vm.showCategory = showCategory;
        vm.setItemLanguage = setItemLanguage;
        vm.currentItemLanguage = currentItemLanguage;

        function addNewGameMode() {
            gameModes.add(vm.newGameMode);
            vm.newGameMode = '';
        }

        function addNewColumn() {
            columns.add(vm.newColumn);
            vm.newColumn = '';
        }

        function dismiss() {
            $location.path('/');
        }

        function showCategory(id) {
            itemCategory.set(id);
            $location.path('/items');
        }

        function setItemLanguage(id) {
            config.get().itemLanguage = id;
            config.save();
        }

        function currentItemLanguage() {
            var id = config.get().itemLanguage || 'en_GB';
            return _.find(d3Config.locales, function(l) {return l.id == id;});
        }
    }

})();