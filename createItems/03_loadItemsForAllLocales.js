'use strict';

let rx = require('rx');

let allItemIds = require('./lib/allItemIds');
let itemIsNotIgnored = require('./lib/itemIsNotIgnored');
let addItemPaths = require('./lib/addItemPaths');
let saveItemsToFileThrottled = require('./lib/saveItemsToFileThrottled');
let checkItemFileAvailability = require('./lib/checkItemFileAvailability');
let multiplyItemForLocales = require('./lib/multiplyItemForLocales');

let source = allItemIds()
    .map((id) => {return {blizzId: id};})
    .filter(itemIsNotIgnored)
    .map(multiplyItemForLocales)
    .flatMap(rx.Observable.fromArray)
    .map(addItemPaths)
    .flatMap(checkItemFileAvailability)
    .filter((item) => !item.fileExists);

saveItemsToFileThrottled(source);
