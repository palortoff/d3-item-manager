(function() {
    'use strict';

    // TODO: rename this into constants, conflicts with config.service
    // TODO: move locales into service m

    angular.module('d3-item-manager').constant('d3Config', {
        githubUrl:    'https://github.com/palortoff/d3-item-manager',
        gameSeason:   4,
        aboutVersion: 1,
        locales:      [
            {
                id:   "en_GB",
                name: "English",
                short:'en',
                region:'eu'
            },
            {
                id:   "de_DE",
                name: "German",
                short:'de',
                region:'eu'
            },
            {
                id:   "es_ES",
                name: "Spanish",
                short:'es',
                region:'eu'
            },
            {
                id:   "fr_FR",
                name: "French",
                short:'fr',
                region:'eu'
            },
            {
                id:   "it_IT",
                name: "Italian",
                short:'it',
                region:'eu'
            },
            {
                id:   "pl_PL",
                name: "Polish",
                short:'pl',
                region:'eu'
            },
            {
                id:   "pt_PT",
                name: "Portuguese",
                short:'pt',
                region:'eu'
            },
            {
                id:   "ru_RU",
                name: "Russian",
                short:'ru',
                region:'eu'
            },
            {
                id:   "kr_KR",
                name: "Korean (South Korea)",
                short:'kr',
                region:'kr'
            },
            {
                id: "sh_TW",
                name:"Traditional Chinese",
                short:'tw',
                region:'tw'
            }
        ]
    })
})();