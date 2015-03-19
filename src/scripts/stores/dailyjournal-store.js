var DailyJournalActions = require('../actions/dailyjournal-actions.js');
var DispenserActions = require('../actions/dispenser-actions.js');
var PumpsStores = require('../stores/pumps-store.js');
var Reflux = require('reflux');
var _ = require('underscore');

var dailyJournalStore = Reflux.createStore({
    listenables: [DispenserActions, DailyJournalActions],
    saveDispenser: function (dispenser) {
        console.log('want save dispenser ', dispenser, ' in _data.dispensers ', _data.dispensers);
        if (dispenser.editing) {
            delete dispenser.editing;
            _data.dispensers[dispenser.id] = dispenser;
        } else {
            //indexing the dispensers to uncouple it from the react UI based key thus identify it always
            dispenser.id = _data.dispensers.length;
            _data.dispensers.push(dispenser);
            _data.showResults = true;
        }
        dispenser.pump = PumpsStores.getPump(dispenser.pumpIndex);
        this.trigger(dispenser);
    },
    removeJournal: function (fuel) {
        _data.dispensers = _.filter(_data.dispensers, function (d) {
            return d.pump.fname !== fuel;
        });
        this.trigger(fuel);
    },
    removeDispenser: function (key) {
        _data.dispensers.splice(key, 1);
        this.trigger(key);
    },
    getJournals: function () {
        var journals = _.chain(_data.dispensers).groupBy(function (o) {
            return o.pump.fname;
        }).pairs().value();
        return journals;
    },
    getData: function () {
        var show = false;
        //maybe later get dispensers to show, from the dispenser store!!
        if (_data.dispensers.length > 0) {
            show = true;
        }
        var now = Date.now();

        return {dispensers: _data.dispensers, date: now, showResults: show}
    }
});

var _data = { dispensers: [], showResults: false};



module.exports = dailyJournalStore;