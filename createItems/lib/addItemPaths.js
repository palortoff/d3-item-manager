'use strict';

let path = require('path');

module.exports = addItemPaths;

function addItemPaths(item){
    item.folderPath = path.join(__dirname, `../../../d3-item-cache/${item.locale.id}`);
    item.filePath = path.join(item.folderPath, `${item.blizzId}.json`);
    return item;
}