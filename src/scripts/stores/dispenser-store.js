//var Actions = require('../actions/pumps-actions.js');
var Reflux = require('reflux');
var PumpsStore = require('../../scripts/stores/pumps-store.js');
var DailyJournalStore = require('../../scripts/stores/dailyjournal-store.js');
var DispenserActions = require('../../scripts/actions/dispenser-actions.js');
var PumpsActions = require('../../scripts/actions/pumps-actions.js');
var _ = require('underscore');

var DispenserStore = Reflux.createStore({
    listenables: [DispenserActions, PumpsActions],
    editDispenser: function (index) {
        _dispenser = _.findWhere(DailyJournalStore.getData().dispensers, {dispenserIndex: index});
        if (_dispenser) {
            _dispenser.editing = true;
        }
        this.trigger(index);
    },
    cancelEditDispenser: function (index) {
        _dispenser = _.findWhere(DailyJournalStore.getData().dispensers, {dispenserIndex: index});
        if (_dispenser) {
            _dispenser.editing = false;
        }
        this.trigger(index);
    },
    getState: function () {
        return _dispenser;
    },
    calcSubtotals: function (pumpId, prevValue, currentValue) {
        var liters = currentValue - prevValue;
        var pump = PumpsStore.getPump(pumpId);
        if (pump !== undefined) {
            var literPrice = pump.fPrice;
            var subtotal = literPrice * liters;
            return {liters: parseFloat(liters), subtotal: parseFloat(subtotal)};
        } else {
            return {liters: 0, subtotal: 0};
        }
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
        if (result.errorMsgs.length > 0) {
            return result;
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

var _dispenser = {dispenserIndex: 0, pumpId: 1, prevCounter: 0, curCounter: 0, validation: {errorMsgs: []} };


module.exports = DispenserStore;