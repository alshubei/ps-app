var Reflux = require('reflux');
var _ = require('underscore');

var JournalResultsStore = Reflux.createStore({
    init: function () {
    },
    getTotals: function (journals) {
        var notSaved = 0, saved = 0;
        notSaved = _.reduce(journals, function (memo, item) {
            return memo + _.chain(item[1]).filter(function (o) {
                return !o.saved;
            }).reduce(function (memo2, item2) {
                return memo2 + item2.subtotal;
            }, 0);
        }, 0);
        saved = _.reduce(journals, function (memo, item) {
            return memo + _.chain(item[1]).filter(function (o) {
                return o.saved && o.saved == true;
            }).reduce(function (memo2, item2) {
                return memo2 + item2.subtotal;
            }, 0);
        }, 0);

        return {notSaved: notSaved, saved: saved};
    }

});


module.exports = JournalResultsStore;