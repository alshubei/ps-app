//var Actions = require('../actions/pumps-actions.js');
var Reflux = require('reflux');
var pumpsStore = require('../../scripts/stores/pumps-store.js');
var dispenserActions = require('../../scripts/actions/dispenser-actions.js');

var Dispenserstore = Reflux.createStore({
    init: function () {
        this.listenToMany(dispenserActions);
    },
    addEntry: function (item) {

    },
    getDispenserData: function () {
      return _dispenserData;
    },
    calcSubtotals: function (pump, prevValue, currentValue) {
        var liters = currentValue - prevValue;
        var literPrice = pumpsStore.getLiterPrice(pump);
        var subtotal = literPrice * liters;
        return {liters: liters, subtotal: subtotal};
    }
});

var _dispenserData = {liters: 0, subtotal: 0, pump: pumpsStore.getDefaultPump(), prevCounter: 0, curCounter: 0 };


module.exports = Dispenserstore;