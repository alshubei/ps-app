
var Reflux = require('reflux');
var _ = require('underscore');
var Utils = require('../../scripts/components/common/utils.js');
var DatePickerActions = require('../actions/datepicker-actions.js');

var DatePickerStore = Reflux.createStore({
    listenables: [DatePickerActions],
    getState: function () {
        return _state;
    },
    getDate: function () {
        return _state.date;
    },
    getDateFormatted: function () {
      return Utils.formatDate(this.getDate());
    },
    getMonth: function () {
      return (new Date(_state.date)).getMonth() + 1;
    },
    changeDate: function (date) {
        //here validate!!!!
        _state.date = date;
        this.trigger(date);
    }
});

var _state = { date: Utils.formatDate(Date.now())};



module.exports = DatePickerStore;