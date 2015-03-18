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
        var dispenser = DailyJournalStore.getData().dispensers[index];
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
    },
    validation: function (obj) {
        var result = {errorMsgs: []};
        if (obj.prevCounter.length == 0 || isNaN(obj.prevCounter)) {
            result.errorMsgs
                .push({msg: 'previous is not valid!'});
        }
        if (obj.curCounter.length == 0 || isNaN(obj.curCounter)) {
            result.errorMsgs
                .push({msg: 'current is not valid!'});
        }
        var validateSemantic = function (obj) {
            var errors = [];
            if (parseFloat(obj.prevCounter) > parseFloat(obj.curCounter)) {
                errors.push({msg: 'previous counter cannot be > than current!'});
            }
            if (parseFloat(obj.prevCounter) === parseFloat(obj.curCounter) && parseFloat(obj.curCounter) == 0) {
                errors.push({msg: 'counters should not have the same counters as zero'});
            }
            return errors;
        };
        if (!isNaN(obj.curCounter)) {
            var errors = validateSemantic(obj);
            if (errors && errors.length > 0)
                result.errorMsgs
                    .push.apply(result.errorMsgs, errors);
        }
        return result;
    }
});

var _dispenserData = {liters: 0, subtotal: 0, pump: PumpsStore.getDefaultPump(), prevCounter: 0, curCounter: 0, validation: {errorMsgs: []} };


module.exports = DispenserStore;