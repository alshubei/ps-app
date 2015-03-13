var Dispenseractions = require('../actions/dispenser-actions.js');
var pumpStores = require('../stores/pumps-store.js');
var Reflux = require('reflux');
var _ = require('underscore');

var dailyJournalStore = Reflux.createStore({
    init: function () {
        this.listenToMany(Dispenseractions);
    },
    getDailyJournal: function () {
        return{data: _dailyJournal, journalResults: _journalresults};
    },
    getJournalResults: function () {
        return _journalresults;
    },
    addEntry: function (dispenser) {
        var pump = dispenser.pump;
        var fuel = pump.fuel;
        var subtotal = dispenser.subtotal;

        //to group by fuel, ensure this dispenser entry is being added new or aggregated respectively via fuel type
        var isFuelAdded = _.findWhere(_dailyJournal, {fuel: fuel}) !== undefined;
        if (isFuelAdded) {
            var found = _.findWhere(_dailyJournal, {fuel: fuel});
            if (found) {
                //add a new dispenser
                found.dispensers.push(dispenser);
            }

        } else {
            _dailyJournal.push({fuel: fuel, dispensers: [dispenser], dueAmount: _calcDueAmount([dispenser])});
        }
        _journalresults = _.reduce(_dailyJournal, function (memo, dispenser) {
            return dispenser.dueAmount + memo;
        }, 0);

        this.trigger(dispenser);

    }
});

var _dailyJournal =
    [
        //{fuel: 'Petrol', counters: {prevCtr: 292212, curCtr: 299999}, dueAmount: 000, totalAmount: 000}, {fuel: 'Diesel', ..}, ...
        //better= {fuel: 'Petrol', dispensers: [{},{}] }
    ];

var _journalresults = 0;

function _calcDueAmount(dispensers) {
    return _.reduce(dispensers, function (memo, item) {
        return memo + item.subtotal;
    }, 0);
}


module.exports = dailyJournalStore;