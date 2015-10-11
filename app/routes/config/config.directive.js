(function() {
    'use strict';

    angular.module('d3-item-manager').controller('ConfigController', ConfigController);

    function ConfigController($location, gameModes, columns, itemCategory, constants, config) {
        var vm = this;
        vm.gameModes = gameModes;
        vm.addNewGameMode = addNewGameMode;

        vm.columns = columns;
        vm.addNewColumn = addNewColumn;
        vm.constants = constants;

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
            return _.find(constants.locales, function(l) {return l.id == id;});
        }
    }

})();