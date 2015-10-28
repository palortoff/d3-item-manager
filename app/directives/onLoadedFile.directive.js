(function() {
    'use strict';

    // from http://jsfiddle.net/alexsuch/6aG4x/
    angular.module('d3-item-manager').directive('onLoadedFile', onLoadedFile);

    function onLoadedFile($parse) {
        return {
            restrict: 'A',
            scope:    false,
            link:     function(scope, element, attrs) {
                var fn = $parse(attrs.onLoadedFile);

                element.on('change', function(onChangeEvent) {
                    var reader = new FileReader();

                    reader.onload = function(onLoadEvent) {
                        scope.$apply(function() {
                            fn(scope, {fileContent: onLoadEvent.target.result});
                        });
                    };

                    reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
                });
            }
        };
    }

})();