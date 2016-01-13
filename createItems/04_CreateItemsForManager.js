'use strict';

let rx = require('rx');

let allItemIds = require('./lib/allItemIds');
let itemIsNotIgnored = require('./lib/itemIsNotIgnored');
let addItemPaths = require('./lib/addItemPaths');
let multiplyItemForLocales = require('./lib/multiplyItemForLocales');
let loadItemFromDisk = require('./lib/loadItemFromDisk');
let addBasicManagerItem = require('./lib/addBasicManagerItem');
let writeItemsToJsonFilesForLocales = require('./lib/writeItemsToJsonFilesForLocales');
let reduceSortedByLocales = require('./lib/reduceSortedByLocales');
let extractDataForManagerItem = require('./lib/extractDataForManagerItem');

let source = allItemIds()
    .map((id) => {return {blizzId: id};})
    //.filter((id)=>id==='P2_mojo_norm_unique_02')
    .filter(itemIsNotIgnored)
    .map(addBasicManagerItem)
    .map(multiplyItemForLocales)
    .flatMap(rx.Observable.fromArray)
    .map(addItemPaths)
    .flatMap(loadItemFromDisk)
    .map(extractDataForManagerItem)
    .reduce(reduceSortedByLocales, {});

source.subscribe(writeItemsToJsonFilesForLocales);

