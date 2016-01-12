'use strict';

let _ = require('lodash');

let locales = require('../config/config.json').locales;

module.exports = multiplyItemForLocales;

function multiplyItemForLocales(item) {
    return _.map(locales, (locale) => _.defaults({}, _.cloneDeep(item), {locale: locale}));
}