var Reflux = require('reflux');
var _ = require('underscore');

var JournalStore = Reflux.createStore({
    init: function () {
    },
    calculateJournal: function (fuelDispensers) {
        var dispensers = fuelDispensers[1];
        var journal = _calcJournal(dispensers);

        return {
            fuel: fuelDispensers[0],
            liters: journal.liters,
            prevCounter: journal.prevCounter,
            curCounter: journal.curCounter,
            subtotal: journal.subtotal
        };
    }

});

function _calcJournal(dispensers) {
    var result = _.reduce(dispensers, function (memo, d) {
        return {liters: memo.liters + d.liters,
            subtotal: memo.subtotal + d.subtotal,
            pump: d.pump, prevCounter: memo.prevCounter + parseFloat(d.prevCounter),
            curCounter: memo.curCounter + parseFloat(d.curCounter)};
    }, {liters: 0, subtotal: 0, prevCounter: 0, curCounter: 0});

    return result;
}


module.exports = JournalStore;