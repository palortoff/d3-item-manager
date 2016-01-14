'use strict';

let _ = require('lodash');

let allItemIds = require('./lib/allItemIds');
let itemIsNotIgnored = require('./lib/itemIsNotIgnored');
let addItemPaths = require('./lib/addItemPaths');
let loadItemFromDisk = require('./lib/loadItemFromDisk');
let addBasicManagerItem = require('./lib/addBasicManagerItem');
let addFirstLocale = require('./lib/addFirstLocale');
let qfs = require('q-io/fs');

let source = allItemIds({loadFromTmpFile: true})
    .map((id) => {return {blizzId: id};})
    .filter(itemIsNotIgnored)
    .map(addFirstLocale)
    .map(addItemPaths)
    .flatMap(loadItemFromDisk)
    .map(correctCharsInItemName)
    .map(addBasicManagerItem)
    .map(extractDataForAdditionalInfo)
    .reduce(makeArray, [])
    .map((acc) => _.sortBy(acc, 'id'));

source.subscribe(writeToAdditionalInfo);

function makeArray(acc, x) {
    acc.push(x);
    return acc;
}

function extractDataForAdditionalInfo(item) {
    return {
        id: item.managerItem.id,
        blizId: item.blizzId,
        name: item.data.name,
        cubeCategory: item.managerItem.cubeCategory,
        cube: item.managerItem.cube,
        classes: item.managerItem.classes,
        bounty: item.managerItem.bounty,
        newItem: item.managerItem.newItem
    };
}

function writeToAdditionalInfo(arrayData) {
    let sortedData = _.sortBy(arrayData, 'id');
    var targetFile = './config/additionalInfo_new.json';
    qfs.write(targetFile, JSON.stringify(sortedData, null, 4))
        .then(()=>console.log(`written to ${targetFile}`))
        .catch((error)=>console.error(`failed to write to ${targetFile}: ${error}`));
}

function correctCharsInItemName(item) {
    item.data.name = item.data.name.replace(/’/mg, "'");
    return item;
}