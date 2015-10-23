(function() {
    'use strict';

    angular.module('d3-item-manager').directive('filestyle', filestyle);

    // from https://github.com/markusslima/bootstrap-filestyle/issues/36

    function filestyle() {
        return {
            restrict:'AC',
            scope: true,
            link: function (scope, element, attrs) {
                var options = {
                    'input': attrs.input !== 'false',
                    'icon': attrs.icon !== 'false',
                    'buttonBefore': attrs.buttonBefore === 'true',
                    'disabled': attrs.disabled === 'true',
                    'size': attrs.size,
                    'buttonText': attrs.buttontext,
                    'buttonName': attrs.buttonname,
                    'iconName': attrs.iconName,
                    'badge': attrs.badge !== 'false',
                    'placeholder': attrs.placeholder
                };
                $(element).filestyle(options);
            }
        };
    }

})();