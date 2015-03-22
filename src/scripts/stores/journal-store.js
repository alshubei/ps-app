var Reflux = require('reflux');
var _ = require('underscore');

var JournalStore = Reflux.createStore({
    init: function () {
    },
    calculateJournal: function (fuelDispensers) {
        var dispensers = fuelDispensers[1];
        var journal = _calcJournal(dispensers);
        var isAllSaved = _.every(dispensers, function (o) {
            return o.saved == true;
        });
        var isSomeSaved = _.some(dispensers, function (o) {
            return o.saved == true;
        });
        return {
            fuel: fuelDispensers[0],
            liters: Number(journal.liters).toFixed(2),
            prevCounter: Number(journal.prevCounter).toFixed(2),
            curCounter: Number(journal.curCounter).toFixed(2),
            subtotal: Number(journal.subtotal).toFixed(2),
            isAllSaved: isAllSaved,
            isSomeSaved: isSomeSaved
        };
    }

});

function _calcJournal(dispensers) {
    var result = _.reduce(dispensers, function (memo, d) {
        return {liters: memo.liters + d.liters,
            subtotal: memo.subtotal + d.subtotal,
            pump: d.pump, prevCounter: memo.prevCounter + parseFloat(d.prevCounter),
            curCounter: memo.curCounter + parseFloat(d.curCounter)};
    }, {liters: 0.00, subtotal: 0.00, prevCounter: 0.00, curCounter: 0.00});

    return result;
}


module.exports = JournalStore;