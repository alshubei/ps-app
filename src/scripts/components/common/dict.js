
var _ = require('underscore');


module.exports = {
    ar: 'ar',
    en: 'en',
    tr: function (word) {
        var lang = require('../../stores/langswitcher-store.js').getLang();
        switch (lang) {
            case 'ar':  dict = require('../common/dict_ar.js'); break;
            default: dict = require('../common/dict_en.js'); break;
        }
        var translated = _.findWhere(dict, {word: word});
        if (translated) {
            if (translated.tr) {
                return translated.tr;
            } else {
                return translated.word;
            }
        } else {
            return word;
        }

    }
};
