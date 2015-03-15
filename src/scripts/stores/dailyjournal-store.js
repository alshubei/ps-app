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
            _dispensers[dispenser.index] = dispenser;
        } else {
            _dispensers.push(dispenser);
        }

        this.trigger(dispenser);
    },
    removeJournal: function (fuel) {
        _dispensers = _.filter(_dispensers, function (d) {
            return d.pump.fuel !== fuel;
        });
        this.trigger(fuel);
    },
    removeDispenser: function (key) {
        _dispensers.splice(key, 1);
        this.trigger(key);
    },
    getJournals: function () {
        var journals = _.chain(_dispensers).groupBy(function (o) {
            return o.pump.fuel;
        }).pairs().value();
        return journals;
    },
    getDispensers: function () {
        return {dispensers: _dispensers}
    },
    pprint: function (json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });

    }
});

var _dispensers = [

];


module.exports = dailyJournalStore;