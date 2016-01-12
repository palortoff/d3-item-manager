'use strict';

let _ = require('lodash');

module.exports = combineSortedByLocales;

function combineSortedByLocales(acc, item) {
    if (_.isUndefined(acc[item.locale.id])) {
        acc[item.locale.id] = [];
    }
    acc[item.locale.id].push(item.managerItem);
    return acc;
}

