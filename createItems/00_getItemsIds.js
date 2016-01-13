'use strict';

let allItemIds = require('./lib/allItemIds');
let qfs = require('q-io/fs');

let fileName = '../../d3-item-cache/allItems.json';

let source = allItemIds({loadFromTmpFile: false})
    .reduce((acc, id) => {acc.push(id);return acc;}, []);

source.subscribe((data) => qfs.write(fileName, JSON.stringify(data.sort(), null, 4)));