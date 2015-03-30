var lang = require('../common/dict_en.js');
lang = require('../common/dict_ar.js');
var _ = require('underscore');
module.exports = {
    tr: function (word) {
        var translated = _.findWhere(lang, {word: word});
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
