'use strict';

let _ = require('lodash');
let qhttp = require('q-io/http');
let config = require('../config/config.json');

module.exports = itemTypes;

function itemTypes() {
    return d3Menu().then(function(menu) {
        return _(menu).chain()
            .filter((item) => typeof item === "object")
            .flatten()
            .filter((item) => item.label === "Game Guide")
            .map((item) => item.children)
            .flatten()
            .filter((item) => item.label === "Items")
            .map((item) =>item.children)
            .flatten()
            .filter((item)=> item.label === "Weapons" || item.label === "Armor")
            .map((item)=> item.children)
            .flatten()
            .map((item)=> item.children)
            .flatten()
            .map((item) => item.url.replace(/^\/item\/(.*)\/$/mg, "$1"))
            .value();
    });
}

function d3Menu() {
    return qhttp.request(config.menuUrl)
        .then((response)=>  response.body.read())
        .then((buffer) => buffer.toString())
        .then((data) => JSON.parse(data));
}