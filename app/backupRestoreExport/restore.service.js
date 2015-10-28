(function() {
    'use strict';

    angular.module('d3-item-manager').factory('restore', restore);

    function restore($uibModal, $route, config, itemTracking) {
        return {
            trigger
        };

        function trigger() {
            var modalInstance = $uibModal.open({
                animation:    true,
                templateUrl:  'backupRestoreExport/restore.modal.template.html',
                controller:   'RestoreModalCtrl',
                controllerAs: 'vm',
                backdrop:     'static'
            });

            modalInstance.result.
                then(doRestore).
                catch(dismiss);
        }

        function doRestore(data) {
            config.setCompleteConfigReloadRequired(data.config);
            itemTracking.setCompleteTrackingReloadRequired(data.tracking);
            $route.reload();
        }

        function dismiss() {
            console.log('dismiss');
        }

    }
})();