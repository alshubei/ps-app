'use strict'

var DailyJournalActions = require('../actions/dailyjournal-actions.js');
var DispenserActions = require('../actions/dispenser-actions.js');
var DatePickerActions = require('../actions/datepicker-actions.js');
var PumpsStore = require('../stores/pumps-store.js');
var DatePickerStore = require('../stores/datepicker-store.js');
var DispenserStore = require('../stores/dispenser-store.js');
var Utils = require('../components/common/utils.js');
var Reflux = require('reflux');
var _ = require('underscore');

var dailyJournalStore = Reflux.createStore({
    listenables: [DispenserActions, DailyJournalActions, DatePickerActions],
    addDispenser: function (dispenser) {
        _addDispenser(dispenser);
        this.trigger(dispenser);

    },
    removeJournal: function (fuel) {
        _removeJournal(fuel);
        this.trigger(fuel);
    },
    removeDispenser: function (index) {
        _removeDispenser(index);
        this.trigger(index);
    },
    getJournals: function () {
        var journals = _.chain(_data.dispensers)
            .map(function (o) {
                return _.extend(_.extend({}, o), {pump: PumpsStore.getPump(o.pumpId)});
            }).groupBy(function (o) {
                return o.pump.fName;
            }).pairs().value();
        return journals;
    },
    getData: function () {
        var show = false;
        //maybe later get dispensers to show, from the dispenser store!!
        if (_data.dispensers.length > 0) {
            show = true;
        }
        var now = Utils.formatDate(Date.now());

        return {dispensers: _data.dispensers, date: now}
    },
    saveJournalsInServer: function () {
        var data = {};
        data.dispensers = _prepareInsertToDispensers(_data.dispensers);
        $.post("server/query.php?data=savejournals", data, function (response, status) {
            //assume success feedback
            if (response > 0) {
                _.map(data.dispensers, function (o) {
                    return _.extend(o, {saved: true});
                });
            }
            this.trigger();
        }.bind(this));

    },
    fetchJournalsFromServer: function (date) {
        $.get("server/query.php?data=getjournals&date='" + date + "'", function (result) {
            //Only if server didn't execute PHP.
            if (result.startsWith('<?php')) {
                return;
            }
            console.log('dispensers from db:', result);
            // result would be = [{id,pump_id,prevCounter,curCounter,date},{}]
            //TODOs: add saved:true, validation: {errorMsgs: []} as what is saved should have been valid. The rest subtotals etc will be calculated as always on demand
            //simply use the same action from UI but this time in reverse direction. DB->UI. It was User-UI
            /*_data.dispensers = [
             {"dispenserIndex": 0, "pumpIndex": 0, "prevCounter": "2", "curCounter": "3", "saved":true, "validation": {"errorMsgs": []}, "liters": 1, "subtotal": 100, "pump_id": 0, "date": "2015/1/21"},
             {"dispenserIndex": 1, "pumpIndex": 1, "prevCounter": "22", "curCounter": "31", "validation": {"errorMsgs": []}, "liters": 9, "subtotal": 900, "pump_id": 1, "date": "2015/1/21"}
             ];*/
            var list = _.map(JSON.parse(result), function (o) {
                return _.chain(o)
                    .extend(
                    {pumpId: parseInt(o.pumpId),
                        prevCounter: parseFloat(o.prevCounter),
                        curCounter: parseFloat(o.curCounter),
                        date: o.date,
                        saved: true})
                    .omit('id')
                    .value();
            });
            _.each(list, function (dispenser) {
                console.log('dispenser', dispenser);
                var subtotals = DispenserStore.calcSubtotals(dispenser.pumpId, dispenser.prevCounter, dispenser.curCounter);
                _.extend(dispenser,{liters: subtotals.liters, subtotal: subtotals.subtotal});
                _addDispenser(dispenser);
            });
            //_data.dispensers = JSON.parse(result);
            this.trigger();
        }.bind(this));

    },
    changeDate: function (date) {
        //call fetchJournalsFromServer(date); :)
        this.trigger(date);
    }
});
var _prepareInsertToDispensers = function (dispensers) {
    var result = _.chain(dispensers)
        .filter(function (o) {
            return !o.saved;
        })
        .map(function (o) {
            return _.extend(o, {pump_id: PumpsStore.getPump(o.pumpId).pump_id, date: Utils.formatDate(DatePickerStore.getState().date)});
        })
        .value();
    return result;
}
var _data = { dispensers: []};


function _addDispenser(dispenser) {
    if (dispenser.editing) {
        delete dispenser.editing;
        var index = _.findIndex(_data.dispensers, {dispenserIndex: dispenser.dispenserIndex});
        _data.dispensers[index] = dispenser;

    } else {
        //indexing the dispensers to uncouple it from the react UI based key thus identify it always
        dispenser.dispenserIndex = _data.dispensers.length;
        _data.dispensers.push(_.extend({}, dispenser));
    }
}

function _removeDispenser(index) {
    var indx = _.findIndex(_data.dispensers, {dispenserIndex: index});
    _data.dispensers.splice(indx, 1);
}

function _removeJournal(fuel) {
    _data.dispensers = _.chain(_data.dispensers)
        .filter(function (o) {
            return fuel !== PumpsStore.getPump(o.pumpId).fName;
        })
        .each(function (o) {
            _removeDispenser(o.dispenserIndex);
        }).value();
}

module.exports = dailyJournalStore;