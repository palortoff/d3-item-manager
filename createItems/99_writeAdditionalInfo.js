'use strict';

let _ = require('lodash');
let fileName = './config/additionalInfo.json';
let fs = require('fs');

let data = _.chain(require('../items/items_en_GB.json'))
    .map((item)=>_.pick(item, ['id', 'blizId', 'name', 'cubeCategory', 'cube', 'classes', 'bounty']))
    .value();

fs.writeFile(fileName, JSON.stringify(_.sortBy(data, 'id'), null, 4), (err) => {
    if (err) {throw err;}
    console.log('It\'s saved!');
});