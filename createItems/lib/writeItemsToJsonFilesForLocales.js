'use strict';

module.exports = writeItemsToJsonFilesForLocales;

let qfs = require('q-io/fs');
let itemPath = './temp/';
let path = require('path');
let _ = require('lodash');

function writeItemsToJsonFilesForLocales(itemDataGroupedByLocale) {
    _.forEach(itemDataGroupedByLocale, writeToFile);
}

function writeToFile(data, localeId) {
    let sortedData = _.sortBy(data, 'id');
    qfs.write(path.join(itemPath, `items_${localeId}.json`), JSON.stringify(sortedData, null, 4));
}