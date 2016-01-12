'use strict';

let _ = require('lodash');
let rx = require('rx');

let allItemIds = require('./lib/allItemIds');
let itemIsNotIgnored = require('./lib/itemIsNotIgnored');
let addItemPaths = require('./lib/addItemPaths');
let saveItemsToFileThrottled = require('./lib/saveItemsToFileThrottled');
let locales = require('./config/config.json').locales;
let checkItemFileAvailability = require('./lib/checkItemFileAvailability');

let source = allItemIds()
    .map((id) => {return {blizzId: id};})
    .filter(itemIsNotIgnored)
    .map(multiplyItemForLocales)
    .flatMap(rx.Observable.fromArray)
    .map(addItemPaths)
    .flatMap(checkItemFileAvailability)
    .filter((item) => !item.fileExists);

saveItemsToFileThrottled(source);

function multiplyItemForLocales(item) {
    return _.map(locales, (locale) => {return {blizzId: item.blizzId, locale};});
}