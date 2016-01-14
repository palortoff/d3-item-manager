'use strict';

let allItemIds = require('./lib/allItemIds');
let addFirstLocale = require('./lib/addFirstLocale');
let itemIsNotIgnored = require('./lib/itemIsNotIgnored');
let addItemPaths = require('./lib/addItemPaths');
let checkItemFileAvailability = require('./lib/checkItemFileAvailability');
let saveItemsToFileThrottled = require('./lib/saveItemsToFileThrottled');

let source = allItemIds({loadFromTmpFile: true})
    .map((id) => {return {blizzId: id};})
    .map(addFirstLocale)
    .map(addItemPaths)
    .filter(itemIsNotIgnored)
    .flatMap(checkItemFileAvailability)
    .filter((item) => !item.fileExists);

saveItemsToFileThrottled(source);

