(function() {
    'use strict';

    angular.module('d3-item-manager').factory('locales', locales);

    var itemLanguageKey = 'itemLanguage';

    function locales(config) {
        return {
            all,
            currentItemLanguage, // TODO: rename to locale
            setItemLanguageById
        };

        function currentItemLanguage(){
            var id = config.getItem(itemLanguageKey, 'en_GB');
            return _.find(allLocales, function(l) {return l.id === id;});
        }

        function all(){
            return allLocales;
        }

        function setItemLanguageById(id){
            config.setItem(itemLanguageKey, id);
        }
    }

    var allLocales = [
        {
            id:     "en_GB",
            name:   "English",
            short:  'en',
            region: 'eu'
        },
        {
            id:     "de_DE",
            name:   "German",
            short:  'de',
            region: 'eu'
        },
        {
            id:     "es_ES",
            name:   "Spanish",
            short:  'es',
            region: 'eu'
        },
        {
            id:     "fr_FR",
            name:   "French",
            short:  'fr',
            region: 'eu'
        },
        {
            id:     "it_IT",
            name:   "Italian",
            short:  'it',
            region: 'eu'
        },
        {
            id:     "pl_PL",
            name:   "Polish",
            short:  'pl',
            region: 'eu'
        },
        {
            id:     "pt_PT",
            name:   "Portuguese",
            short:  'pt',
            region: 'eu'
        },
        {
            id:     "ru_RU",
            name:   "Russian",
            short:  'ru',
            region: 'eu'
        },
        {
            id:     "kr_KR",
            name:   "Korean (South Korea)",
            short:  'kr',
            region: 'kr'
        },
        {
            id:     "sh_TW",
            name:   "Traditional Chinese",
            short:  'tw',
            region: 'tw'
        }
    ];
})();