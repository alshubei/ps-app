var Reflux = require('reflux');
var _ = require('underscore');

var JournalResultsStore = Reflux.createStore({
    init: function () {
    },
    getTotals: function (journals) {
        var result = _.reduce(journals, function (memo, item) {
            return memo + _.reduce(item[1], function (memo2, item2) {
                return memo2 + item2.subtotal;
            }, 0);
        }, 0);
        return result;
    }

});


module.exports = JournalResultsStore;