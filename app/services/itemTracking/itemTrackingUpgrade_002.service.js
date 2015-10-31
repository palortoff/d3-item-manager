(function() {
    'use strict';

    angular.module('d3-item-manager').factory('itemTrackingUpgrade_002', removeEntriesForDuplicateIds);

    function removeEntriesForDuplicateIds(){
        return function(tracking, save){
            removeBadData(tracking);
            save();

        };

        function removeBadData(tracking) {
            _.forEach([1016,1026,1036,1046,1056,1066,1076,1086,1096,1106], function(id){delete tracking[id];});
        }
    }
})();