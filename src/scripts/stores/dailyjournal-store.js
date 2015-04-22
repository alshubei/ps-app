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
        _data.shouldClickView = false;
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
    getUser: function () {
        return _data.user;
    },
    makeJournals: function () {
        if (DailyJournalStore.shouldClickView()) {
            return  [];
        }
        var journals = _.chain(_data.dispensers)
            .filter({date: DatePickerStore.getDateFormatted()})
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
    saveJournals: function () {
        var data = {};
        data.dispensers = _prepareInsertToDispensers(_data.dispensers);
        data.date = DatePickerStore.getDateFormatted();
        //mocking the server
        if (window.location.origin == 'http://localhost:8000') {
            _.map(data.dispensers, function (o) {
                return _.extend(o, {saved: true});
            });
            this.trigger();
            return;
        }

        jQuery.post("server/query.php?data=savejournals", data, function (response, status) {
            var responseJson = JSON.parse(response);
            if (!responseJson.error) {
                _.map(data.dispensers, function (o) {
                    return _.extend(o, {saved: true});
                });
            }
            this.trigger();
        }.bind(this));


    },
    _getAllJournals: function (filter) {
        if (window.location.origin == 'http://localhost:8000') {
            this.trigger();
            return;
        }
        _getJournals(filter, function () {
            this.trigger();
        }.bind(this));
    },
    getJournalDays: function (date) {
        if (window.location.origin == 'http://localhost:8000') {
            _getJournalDaysNotSaved(date);
            this.trigger();
            return;
        }
        _getAllJournalDays(date, function () {
            this.trigger(date);
        }.bind(this))

    },
    viewJournals: function (filterObj) {
        //_data.date = Utils.formatDate(filterObj.date);
        _data.shouldClickView = false;
        this._getAllJournals(filterObj);
        //DailyJournalActions.getJournals(filterObj);
        //DailyJournalActions.fetchJournalDaysFromServer(filterObj.date);

    },
    switchLang: function (lang) {
        this.trigger(lang);
    },
    hideLoginModal: function () {
        _data.showLoginModal = false;
        this.trigger();
    },
    setUser: function (user) {
        _data.user = _.extend({}, user);
        this.trigger(user);
    },
    changeDate: function (date) {
        _data.shouldClickView = true;
        if (window.location.origin == 'http://localhost:8000') {
            _getJournalDaysNotSaved(date);
            this.trigger();
            return;
        }
        //call the corres. action or the actual functions as you are in the store any way?!?
        _getAllJournalDays(date, function () {
            this.trigger(date);
        }.bind(this));
    },
    error: function (error) {
        _data.errors.push(error);
        this.trigger(error);
    },
    getErrors: function () {
        return _data.errors;
    },
    shouldClickView: function () {
        return _data.shouldClickView;
    }
});
/**** State*****/
var _data = {
    dispensers: [],
    //date: DatePickerStore.getDate(),
    shouldClickView: true,
    lang: LangSwitcherStore.getLang(),
    user: {},
    journalDays: [],
    showDispenserModal: false,
    showLoginModal: false,
    filterByAllUsers: true,
    errors: []
};
/************/
var _getJournalDaysNotSaved = function (date) {
    var dateMs = (new Date(date)).getTime();
    var dateFromMs = (new Date(Utils.getDateFrom(date))).getTime();
    var dateToMs = (new Date(Utils.getDateTo(date))).getTime();
    _data.journalDays =
        _.chain(_data.dispensers)
            .filter(function (o) {
                var dMs = (new Date(o.date)).getTime();
                if (dMs >= dateFromMs && dMs <= dateToMs) {
                    return o;
                }
            })
            .map(function (o) {
                return _markCurrent(o,dateMs, o.saved);
            })
            .groupBy(function (o) {
                return o.date;
            })
            .map(function (grouped) {
                return grouped[0];
            })
            .value();

}
var _markCurrent = function (o, nowMs, isSaved) {
    var dMs = (new Date(o.date)).getTime();
    if (dMs == nowMs) {
        return _.extend({}, {date: o.date, saved: isSaved, current: true});
    }else {
        return _.extend({}, {date: o.date, saved: isSaved, current: false});
    }
}
var _getAllJournalDays = function (date, callback) {
    _getJournalDaysNotSaved(date);
    //get journal days saved
    var requestUrl = "server/query.php?data=getjournaldays&datefrom='" +
        Utils.getDateFrom(date) + "'&dateto='" +
        Utils.getDateTo(date) + "'";
    if (!_data.filterByAllUsers) {
        requestUrl = requestUrl + "&userid=" + _data.user.userId;
    }
    jQuery.get(requestUrl, function (result) {
        var _result = JSON.parse(result);
        var nowMs = (new Date(date)).getTime();
        _result = _.chain(_result)
            .map(function (o) {
                return _.extend(o,{current: false, saved: true});
            })
            .value();
        console.log('_result',_result);
        console.log('_data.journalDays',_data.journalDays);
        _data.journalDays = _.chain(_data.journalDays)
            .filter(function (o) {
                return o.saved == false;
            })
            .union(_result)
            .map(function (o) {
                return _markCurrent(o, nowMs, true);
            })
            .uniq(function (item, key, date) {
                return item.date;
            })
            .value();
        if (callback) callback();
    }.bind(this));
}
var _getJournals = function (filter, callback) {
    _data.dispensers = _.filter(_data.dispensers, {saved: false});
    var requestUrl = "server/query.php?data=getjournals&date='" + filter.date + "'";
    if (filter.user) {
        requestUrl = requestUrl + "&userid=" + filter.user.userId;
        _data.filterByAllUsers = false;
    } else {
        _data.filterByAllUsers = true;
    }
    PumpsActions.getPumps(function () {
        jQuery.get(requestUrl, function (result) {
            var list = _.map(JSON.parse(result), function (o) {
                return _.chain(o)
                    .extend(
                    {pumpId: parseInt(o.pumpId),
                        prevCounter: parseFloat(o.prevCounter),
                        curCounter: parseFloat(o.curCounter),
                        //date: Utils.formatDate(o.date),
                        saved: true})
                    .omit('id')
                    .value();
            });
            /* if (list.length == 0) {
             _data.internalMessages.push("no_journals_this_date");
             }*/
            _.each(list, function (dispenser) {
                var subtotals = DispenserStore.calcSubtotals(dispenser.pumpId, dispenser.prevCounter, dispenser.curCounter);
                _.extend(dispenser, {liters: subtotals.liters, subtotal: subtotals.subtotal});
                _addDispenser(dispenser);
            });
            //_data.dispensers = JSON.parse(result);
            if (callback) callback();
        }.bind(this));

    }.bind(this));
}
var _prepareInsertToDispensers = function (dispensers) {
    var result = _.chain(dispensers)
        .filter(function (o) {
            return !o.saved;
        })
        .map(function (o) {
            return _.extend(o, {pump_id: PumpsStore.getPump(o.pumpId).pump_id, date: DatePickerStore.getDateFormatted()});
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
        _data.dispensers.push(_.extend({userId: DailyJournalStore.getUser().userId, date: DatePickerStore.getDateFormatted(), saved: false}, dispenser));
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