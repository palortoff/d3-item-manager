'use strict';

let locale = require('../config/config.json').locales[0];

module.exports = addFirstLocale;

function addFirstLocale(item){
    item.locale = locale;
    return item;
}