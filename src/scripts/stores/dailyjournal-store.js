var DailyJournalActions = require('../actions/dailyjournal-actions.js');
var DispenserActions = require('../actions/dispenser-actions.js');
var pumpStores = require('../stores/pumps-store.js');
var Reflux = require('reflux');
var _ = require('underscore');

var dailyJournalStore = Reflux.createStore({
    listenables: [DispenserActions, DailyJournalActions],
    saveDispenser: function (dispenser) {
        if (dispenser.editing) {
            delete dispenser.editing;
            _data.dispensers[dispenser.index] = dispenser;
        } else {
            //indexing the dispensers to uncouple it from the react UI based key thus identify it always
            dispenser.index = _data.dispensers.length;
            _data.dispensers.push(dispenser);
            _data.showResults = true;
        }

        this.trigger(dispenser);
    },
    removeJournal: function (fuel) {
        _data.dispensers = _.filter(_data.dispensers, function (d) {
            return d.pump.fuel !== fuel;
        });
        this.trigger(fuel);
    },
    removeDispenser: function (key) {
        _data.dispensers.splice(key, 1);
        this.trigger(key);
    },
    getJournals: function () {
        var journals = _.chain(_data.dispensers).groupBy(function (o) {
            return o.pump.fuel;
        }).pairs().value();
        return journals;
    },
    getData: function () {
        var show = false;
        if (_data.dispensers.length > 0) {
            show = true;
        }
        var now = Date.now();

        return {dispensers: _data.dispensers, date: now, showResults: show}
    }
});

var _data = {dispensers: [], showResults: false};


module.exports = dailyJournalStore;