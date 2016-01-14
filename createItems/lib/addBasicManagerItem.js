'use strict';

let managerItems = require('../config/additionalInfo.json');
let getPassive = require('./getPassive');
let _ = require('lodash');

module.exports = addBasicManagerItem;

let lastId = _.chain(managerItems)
    .map((item)=>Number(item.id))
    .reduce((max, id) => Math.max(max, id))
    .value();

function addBasicManagerItem(apiItem) {
    // TODO: not filter!
    // use find, first by id, then by name
    // otherwise hellfire rings (same name) get messed up!
    apiItem.managerItem = _.chain(managerItems)
        .filter((managerItem) => managerItem.blizId === apiItem.blizzId || managerItem.name === apiItem.data.name)
        .first()
        .value();

    if (_.isUndefined(apiItem.managerItem) || _.isUndefined(apiItem.managerItem.id)) {
        let nextId = lastId + 1;
        console.error(`No previous data found for ${apiItem.blizzId} (${apiItem.data.name}). Using id ${nextId}`);
        let itemIsForCube = isForCube(apiItem);
        apiItem.managerItem = {
            id: nextId,
            blizId: apiItem.blizzId,
            cubeCategory: itemIsForCube ? cubeCategory(apiItem) : undefined,
            cube: itemIsForCube,
            classes: 'TBD',
            bounty: false, // so I would think...
            newItem: true
        };
        lastId = nextId;
    }

    return apiItem;
}

function isForCube(item) {
    let passive = getPassive(item);
    if (passive && passive.length > 1) {
        return true;
    }
    if (item.data.set) {
        return false;
    }
    console.error(`No previous data found for ${item.blizzId} (${item.data.name})`);
    console.error('new item is not for cube?!?');
    return false;
}

function cubeCategory(item){
    switch(item.data.type.id){
        case 'GenericBelt':
        case 'Boots':
        case 'Bracers':
        case 'Helm':
        case 'Shoulders':
            return 'Armor';
        case 'Wand':
        case 'Axe':
        case 'CeremonialDagger':
        case 'FistWeapon':
        case 'Flail2H':
        case 'HandXbow':
        case 'MightyWeapon1H':
        case 'MightyWeapon2H':
        case 'Mojo':
        case 'Orb':
        case 'Staff':
        case 'Dagger':
        case 'CrusaderShield':
        case 'Sword':
            return 'Weapon';
        case 'Ring':
        case 'Amulet':
            return 'Jewelry';
        default:
            console.error(`unknown item type: ${item.data.type.id}`);
    }
}