describe('Item consistency', function() {
    'use strict';
    
    beforeAll(function() {
        itemsEnGb = fixture.load(`items/items_en_GB.json`);
    });
    it(`there are no duplicate ids`, function() {

        _.chain(itemsEnGb).
            map(function(item) {return item.id;}).
            forEach(expectOnlyOneItemWithId);

        function expectOnlyOneItemWithId(id) {
            let itemsWithId = _.filter(itemsEnGb, function(item) {return item.id === id;});
            expect(itemsWithId.length).toEqual(1, `should have one item with id ${id}`);
        }
    });

    describe('for all languages the ids and blizIds match', function() {
        _.forEach(['de_DE', 'es_ES', 'fr_FR', 'it_IT', 'kr_KR','pl_PL', 'pt_PT', 'ru_RU', 'sh_TW'], function(lang) {
            it(lang, function() {
                let itemsInLang = fixture.load(`items/items_${lang}.json`);

                _.forEach(itemsInLang, function(itemLang) {
                    let itemEn = _.find(itemsEnGb, function(itemEn) {return itemEn.id === itemLang.id;});
                    expect(itemEn).toBeDefined(`did not find id ${itemLang.id}`);
                    expect(itemEn.blizId).toEqual(itemLang.blizId, `blizId mismatch for ${itemLang.id}`);
                });
            });
        });

    });

    var itemsEnGb;
});
