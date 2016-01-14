'use strict';

let _ = require('lodash');

let locales = require('../config/config.json').locales;

module.exports = multiplyItemForLocales;

function multiplyItemForLocales(item) {
    delete item.locale;
    var mapped = _.chain(locales)
        .filter((locale) => locale.use)
        .map((locale) => _.defaults({}, _.cloneDeep(item), {locale: locale}))
        .value();
    return mapped;
}