var DailyJournalActions = require('../actions/dailyjournal-actions.js');
var DispenserActions = require('../actions/dispenser-actions.js');
var PumpsStores = require('../stores/pumps-store.js');
var Reflux = require('reflux');
var _ = require('underscore');

var dailyJournalStore = Reflux.createStore({
    listenables: [DispenserActions, DailyJournalActions],
    saveDispenser: function (dispenser) {
        if (dispenser.editing) {
            delete dispenser.editing;
            var index = _.findIndex(_data.dispensers, {id: dispenser.id});
            _data.dispensers[index] = dispenser;

        } else {
            //indexing the dispensers to uncouple it from the react UI based key thus identify it always
            dispenser.id = _data.dispensers.length;
            dispenser.pump = PumpsStores.getPump(dispenser.pumpIndex);
            _data.dispensers.push(_.extend({}, dispenser));
        }

        this.trigger(dispenser);

    },
    removeJournal: function (fuel) {
        _data.dispensers = _.filter(_data.dispensers, function (d) {
            return d.pump.fname !== fuel;
        });
        this.trigger(fuel);
    },
    removeDispenser: function (id) {
        var index = _.findIndex(_data.dispensers, {id: id});
        _data.dispensers.splice(index, 1);
        this.trigger(index);
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

        return {dispensers: _data.dispensers, date: now}
    },
    saveJournalsInServer: function () {
        var data = _data.dispensers;
        $.post("server/query.php?data=savejournals",data, function (data, status) {

            console.log('data: ', data, ', status ',  status);
            this.trigger();
        }.bind(this));

    }
});

var _data = { dispensers: []};


module.exports = dailyJournalStore;