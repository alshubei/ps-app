//var Actions = require('../actions/pumps-actions.js');
var Reflux = require('reflux');
var ps = require('../../scripts/stores/pumps-store.js');
var dispenserActions = require('../../scripts/actions/dispenser-actions.js');

var Dispenserstore = Reflux.createStore({
    init: function () {
        this.listenToMany(dispenserActions);
    },
    addEntry: function (item) {
        //{liters: 0, subtotal: 0, pump: 'p1', prevCounter: 0, curCounter: 0 }

        //console.log(item);
    },
    calcSubtotals: function (pumpId, prevValue, currentValue) {
        var liters = currentValue - prevValue;
        var literPrice = ps.getLiterPrice(pumpId);
        var subtotal = literPrice * liters;
        return {liters: liters, subtotal: subtotal};
    }
});

module.exports = Dispenserstore;