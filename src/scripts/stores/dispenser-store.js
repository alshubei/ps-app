//var Actions = require('../actions/pumps-actions.js');
var Reflux = require('reflux');
var PumpsStore = require('../../scripts/stores/pumps-store.js');
var DailyJournalStore = require('../../scripts/stores/dailyjournal-store.js');
var DispenserActions = require('../../scripts/actions/dispenser-actions.js');

var DispenserStore = Reflux.createStore({
    init: function () {
        this.listenToMany(DispenserActions);
    },
    editDispenser: function (index) {
        var dispenser = DailyJournalStore.getDispensers().dispensers[index];
        console.log(dispenser);
        dispenser.editing = true;
        dispenser.index = index;
        _dispenserData = dispenser;
        this.trigger(index);
    },
    getDispenserData: function () {
        return _dispenserData;
    },
    calcSubtotals: function (pump, prevValue, currentValue) {
        var liters = currentValue - prevValue;
        var literPrice = PumpsStore.getLiterPrice(pump);
        var subtotal = literPrice * liters;
        return {liters: liters, subtotal: subtotal};
    }
});

var _dispenserData = {liters: 0, subtotal: 0, pump: PumpsStore.getDefaultPump(), prevCounter: 0, curCounter: 0, valid: true };


module.exports = DispenserStore;