'use strict';

let q = require("q");
let request = require("request");
let SeparatorChunker = require('chunking-streams').SeparatorChunker;

module.exports = idsForType;

function idsForType(itemType){
    return q.Promise(function(resolve, reject) { //eslint-disable-line new-cap
        var url = `http://eu.battle.net/d3/en/item/${itemType}/`;

        var chunker = new SeparatorChunker({separator: '\n', flushTail: false});

        var itemIds = [];
        let match;

        chunker.on('data', function(data) {
            var string = data.toString();
            match = string.match(/url\(http:\/\/media\.blizzard\.com\/d3\/icons\/items\/large\/(.*)_demonhunter_male\.png\)/m);
            if (match != null) {
                itemIds.push(match[1]);
            }
        });

        chunker.on('end', function() {
            resolve(itemIds);
        });
        chunker.on('error', reject);

        request(url).pipe(chunker);
    });
}