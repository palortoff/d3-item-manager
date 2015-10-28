(function() {
    'use strict';

    angular.module('d3-item-manager').controller('RestoreModalCtrl', RestoreModalCtrl);

    function RestoreModalCtrl($uibModalInstance) {
        var vm = this;

        vm.restore = restore;
        vm.cancel = cancel;
        vm.onLoad = onLoad;
        vm.canRestore = canRestore;
        vm.hasInvalidRestoreData = hasInvalidRestoreData;

        var dataToRestore;

        function restore() {
            $uibModalInstance.close(dataToRestore);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function onLoad(loadedData) {
            dataToRestore = JSON.parse(loadedData);
        }

        function canRestore() {
            if (_.isUndefined(dataToRestore)) {return false;}
            return !hasInvalidRestoreData();
        }

        function hasInvalidRestoreData() {
            if (_.isUndefined(dataToRestore)) {return false;}
            if (_.isUndefined(dataToRestore.config)) {return true;}
            return !!_.isUndefined(dataToRestore.tracking);

        }
    }
})();