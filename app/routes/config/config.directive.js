(function() {
    'use strict';

    angular.module('d3-item-manager').controller('ConfigController', ConfigController);

    function ConfigController($location,
                              gameModes,
                              columns,
                              itemCategory,
                              locales,
                              backup,
                              restore,
                              exportService) {
        var vm = this;
        vm.gameModes = gameModes;
        vm.addNewGameMode = addNewGameMode;
        vm.columns = columns;
        vm.addNewColumn = addNewColumn;
        vm.locales = locales;
        vm.dismiss = dismiss;
        vm.showCategory = showCategory;
        vm.backupData = backup.data;
        vm.triggerRestore = restore.trigger;
        vm.exportData = exportService.data;

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
    }
})();