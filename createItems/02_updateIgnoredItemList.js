'use strict';

let _ = require('lodash');
let qfs = require('q-io/fs');

let allItemIds = require('./lib/allItemIds');
let addFirstLocale = require('./lib/addFirstLocale');
let itemIsNotIgnored = require('./lib/itemIsNotIgnored');
let addItemPaths = require('./lib/addItemPaths');
let loadItemFromDisk = require('./lib/loadItemFromDisk');
let ignoredItems = require('./config/ignoredItems.json');

let source = allItemIds()
    .map((id) => {return {blizzId: id};})
    .map(addFirstLocale)
    .map(addItemPaths)
    .filter(itemIsNotIgnored)
    .flatMap(loadItemFromDisk)
    .filter((item) => item.data.displayColor !== 'orange')
    .filter((item) => item.data.displayColor !== 'green')
    .reduce((arr, item) => {
        arr.push(item.blizzId);
        return arr;
    }, [])
    ;

source.subscribe(addToIgnoredItems);

function addToIgnoredItems(items) {
    let bothArrays = [items, ignoredItems];
    let combined = _.chain(bothArrays)
        .flatten()
        .unique()
        .sort()
        .value();
    qfs.write('./config/ignoredItems.json', JSON.stringify(combined, null, 4))
        .then(()=>console.log('ignored items written'))
        .catch((error)=> {
            console.error('failed to write ignored items');
            console.error(error.message);
            console.error(error.stack);
        });
}