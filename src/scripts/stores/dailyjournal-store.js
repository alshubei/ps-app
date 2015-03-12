var Actions = require('../actions/dispenser-actions.js');
var pumpStores = require('../stores/pumps-store.js');
var Reflux = require('reflux');
var _ = require('underscore');

var dailyJournalStore = Reflux.createStore({
    init: function () {
        this.listenToMany(Actions);
    },
    getDailyJournal: function () {
        return{data: _dailyJournal}
    },
    addEntry: function (item) {
        var pumpId = item.pump;
        var pump = pumpStores.getPump(pumpId);
        var fuel = pump.fuel;
        //{liters: 0, subtotal: 0, pump: 'p1', prevCounter: 0, curCounter: 0 }
        var prevCtr = item.prevCounter;
        var curCtr = item.curCounter;
        var subtotal = item.subtotal;

        //to group by fuel, ensure this entry is added new or aggregated respectively
        if (_isAdded(fuel)) {
            var it = _.findWhere(_dailyJournal, {fuel: fuel});
            if (it) {
                it.counters.prevCtr = prevCtr + it.counters.prevCtr;
                it.counters.curCtr = curCtr + it.counters.curCtr;
                it.dueAmount = subtotal + it.dueAmount;
            }

        } else {
            _dailyJournal.push({fuel: fuel, counters: {prevCtr: prevCtr, curCtr: curCtr}, dueAmount: subtotal});
        }
        this.trigger(it);

    }
});

var _dailyJournal =
    [
        //{fuel: 'Petrol', counters: {prevCtr: 292212, curCtr: 299999}, dueAmount: 000}
    ];

function _isAdded(fuel) {
    return  _.findWhere(_dailyJournal, {fuel: fuel})!== undefined;
}

module.exports = dailyJournalStore;