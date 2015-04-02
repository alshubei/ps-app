var DailyJournalActions = require('../actions/dailyjournal-actions.js');
var DispenserActions = require('../actions/dispenser-actions.js');
var PumpsActions = require('../actions/pumps-actions.js');
var DatePickerActions = require('../actions/datepicker-actions.js');
var LangSwitcherActions = require('../actions/langswitcher-actions.js');
var LoginActions = require('../actions/login-actions.js');
var PumpsStore = require('../stores/pumps-store.js');
var DatePickerStore = require('../stores/datepicker-store.js');
var LangSwitcherStore = require('../stores/langswitcher-store.js');
var LoginStore = require('../stores/login-store.js');
var DispenserStore = require('../stores/dispenser-store.js');
var Utils = require('../components/common/utils.js');
var Reflux = require('reflux');
var _ = require('underscore');


var DailyJournalStore = Reflux.createStore({
    listenables: [DailyJournalActions, DispenserActions, DatePickerActions, LangSwitcherActions, LoginActions],
    showLoginModal: function () {
        _data.showLoginModal = true;
        this.trigger();
    },
    showDispenserModal: function () {
        _data.showDispenserModal = true;
        this.trigger();
    },
    hideDispenserModal: function () {
        _data.showDispenserModal = false;
        this.trigger();
    },
    addDispenser: function (dispenser) {
        _addDispenser(dispenser);
        _data.showDispenserModal = false;
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
            .filter({date: _data.date})
            .map(function (o) {
                return _.extend(_.extend({}, o), {pump: PumpsStore.getPump(o.pumpId)});
            })
            .sortBy(function (o) {
                return o.pump.fName;
            })
            .groupBy(function (o) {
                return o.pump.fName;
            })
            .pairs().value();
        return journals;
    },
    getData: function () {

        var now = Utils.formatDate(Date.now());

        return _data;
    },
    cancelEditDispenser: function () {
        this.hideDispenserModal();
    },
    saveJournalsInServer: function () {
        var data = {};
        data.dispensers = _prepareInsertToDispensers(_data.dispensers);
        //mocking the server
        if (window.location.origin == 'http://localhost:8000') {
            _.map(data.dispensers, function (o) {
                return _.extend(o, {saved: true});
            });
            this.trigger();
        }

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
        _data.dispensers = _.filter(_data.dispensers, {saved: false});
        PumpsActions.fetchPumpsFromServer(function () {
            $.get("server/query.php?data=getjournals&date='" + date + "'", function (result) {
                var list = _.map(JSON.parse(result), function (o) {
                    return _.chain(o)
                        .extend(
                        {pumpId: parseInt(o.pumpId),
                            prevCounter: parseFloat(o.prevCounter),
                            curCounter: parseFloat(o.curCounter),
                            date: Utils.formatDate(o.date),
                            saved: true})
                        .omit('id')
                        .value();
                });
                _.each(list, function (dispenser) {
                    var subtotals = DispenserStore.calcSubtotals(dispenser.pumpId, dispenser.prevCounter, dispenser.curCounter);
                    _.extend(dispenser, {liters: subtotals.liters, subtotal: subtotals.subtotal});
                    _addDispenser(dispenser);
                });
                //_data.dispensers = JSON.parse(result);
                this.trigger();
            }.bind(this));

        }.bind(this));

    },
    changeDate: function (date) {
        _data.date = Utils.formatDate(date);
        this.trigger(date);
        DailyJournalActions.fetchJournalsFromServer(date);
    },
    switchLang: function (lang) {
        this.trigger(lang);
    },
    hideLoginModal: function () {
        _data.showLoginModal = false;
        this.trigger();
    }

});
/**** State*****/
var _data = {
    dispensers: [],
    date: DatePickerStore.getDate(),
    lang: LangSwitcherStore.getLang(),
    user: LoginStore.getUser(),
    showDispenserModal: false,
    showLoginModal: false
};
/************/

var _prepareInsertToDispensers = function (dispensers) {
    var result = _.chain(dispensers)
        .filter(function (o) {
            return !o.saved;
        })
        .map(function (o) {
            return _.extend(o, {pump_id: PumpsStore.getPump(o.pumpId).pump_id, date: Utils.formatDate(DatePickerStore.getDate())});
        })
        .value();
    return result;
};


function _addDispenser(dispenser) {
    if (dispenser.editing) {
        dispenser.editing = false;
        var index = _.findIndex(_data.dispensers, {dispenserIndex: dispenser.dispenserIndex});
        var d = _.extend({}, dispenser);
        _data.dispensers[index] = d;

    } else {
        //indexing the dispensers to uncouple it from the react UI based key thus identify it always
        dispenser.dispenserIndex = _data.dispensers.length;
        _data.dispensers.push(_.extend({date: DatePickerStore.getDate(), saved: false}, dispenser));
    }
};

function _removeDispenser(index) {
    var indx = _.findIndex(_data.dispensers, {dispenserIndex: index});
    _data.dispensers.splice(indx, 1);
};

function _removeJournal(fuel) {
    _data.dispensers = _.chain(_data.dispensers)
        .filter(function (o) {
            return fuel !== PumpsStore.getPump(o.pumpId).fName;
        })
        .each(function (o) {
            _removeDispenser(o.dispenserIndex);
        }).value();
};

module.exports = DailyJournalStore;