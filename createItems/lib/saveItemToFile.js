'use strict';

let qfs = require('q-io/fs');
let qhttp = require('q-io/http');
let apiKey = require('../config/apiKey.json');
let _ = require('lodash');

module.exports = saveItemToFile;

function saveItemToFile(item){
    item.url = `${item.locale.url}${item.blizzId}?locale=${item.locale.id}&apikey=${apiKey}`;

    return qhttp.request(item.url)
        .then((response) => response.body.read())
        .then((buffer) => buffer.toString())
        .then((data) => {
            let json = JSON.parse(data);
            if (_.isUndefined(json.id)) { throw new Error('not loaded');}
            item.data = json;
        })
        .then(() => qfs.makeTree(item.folderPath))
        .then(() => qfs.write(item.filePath, JSON.stringify(item.data, null, 4)))
        .then(() => console.log(`saved ${item.filePath}`))
        .catch((error) => {
            console.error(`failed to load data for ${item.blizzId} (${item.url}):`);
            console.error(`${error}`);
            console.error(`${error.stack}`);
        })
        .then(() => item);
}