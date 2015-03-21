'use strict'

var DailyJournalActions = require('../actions/dailyjournal-actions.js');
var DispenserActions = require('../actions/dispenser-actions.js');
var PumpsStore = require('../stores/pumps-store.js');
var Reflux = require('reflux');
var _ = require('underscore');

var dailyJournalStore = Reflux.createStore({
    listenables: [DispenserActions, DailyJournalActions],
    saveDispenser: function (dispenser) {
        if (dispenser.editing) {
            delete dispenser.editing;
            var index = _.findIndex(_data.dispensers, {dispenserIndex: dispenser.dispenserIndex});
            _data.dispensers[index] = dispenser;

        } else {
            //indexing the dispensers to uncouple it from the react UI based key thus identify it always
            dispenser.dispenserIndex = _data.dispensers.length;
            //dispenser.pump = PumpsStore.getPump(dispenser.pumpIndex);
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
    removeDispenser: function (index) {
        var index = _.findIndex(_data.dispensers, {dispenserIndex: index});
        _data.dispensers.splice(index, 1);
        this.trigger(index);
    },
    getJournals: function () {
        var journals = _.chain(_data.dispensers)
            .map(function (o) {
                return _.extend(_.extend({}, o), {pump: PumpsStore.getPump(o.pumpIndex)});
            }).groupBy(function (o) {
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
        var data = {};
        data.dispensers = _data.dispensers;
        _prepareInsertToDispensers(data.dispensers);
        $.post("server/query.php?data=savejournals", data, function (response, status) {
            //assume success feedback
            if (response > 0) {
                _.map(data.dispensers, function (o) {
                    return _.extend(o, {saved: true});
                });
            }
            this.trigger(); //this trigger is necessary only if re-rendering is needed. Could needed also, some feedback from server
        }.bind(this));

    }
});
var _prepareInsertToDispensers = function (dispensers) {
    console.log('before ', dispensers);
    var result = _.chain(dispensers)
        .filter(function (o) {
            return !o.saved;
        })
        .map(function (o) {
            return _.extend(o, {pid: PumpsStore.getPump(o.pumpIndex)}.pid);
        }).value();
    console.log('after ', result);
    return result;
}
var _data = { dispensers: []};


module.exports = dailyJournalStore;