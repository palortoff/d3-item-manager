(function() {
    'use strict';

    angular.module('download-data', []).directive('downloadData', downloadData);

    var idAppendix = 0;

    function downloadData($q) {
        return {
            restrict: 'EA',
            scope:    {
                getData:  '&ddGetter',
                json:     '@ddJson',
                encoding: '@ddEncoding',
                type:     '@ddType',
                filename: '=ddFilename'
            },
            link:     link
        };

        function link(scope, element) {
            element.on('click', createAndDownload);

            function createAndDownload() {
                $q.when(scope.getData(), function(data) {

                    var type = scope.type;
                    if (scope.json === "true") {
                        data = JSON.stringify(data, null, 2);
                        type = type || 'application/json';
                    }
                    type = type || 'text/plain';
                    if (scope.encoding === 'utf8'){
                        data = '\ufeff' + data;
                    }

                    var blob = new Blob([data], {type: type});
                    var url = URL.createObjectURL(blob);
                    var elementId = 'ngDataDownload' + idAppendix++;

                    var newElem = angular.element(
                        '<a ' +
                        'style="display:none" ' +
                        'id="' + elementId + '" ' +
                        'href="' + url + '" download="' + scope.filename + '">' +
                        'test' +
                        '</a>');

                    angular.element('body').append(newElem);
                    document.getElementById(elementId).click();
                    newElem.remove();
                });
            }
        }
    }
})();