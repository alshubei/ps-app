//var Actions = require('../actions/pumps-actions.js');
var Reflux = require('reflux');
var PumpsStore = require('../stores/pumps-store.js');
var DispenserActions = require('../actions/dispenser-actions.js');
var PumpsActions = require('../actions/pumps-actions.js');
var _ = require('underscore');
var Dict = require('../components/common/dict.js');

var DispenserStore = Reflux.createStore({
    listenables: [DispenserActions, PumpsActions],

    editDispenser: function (index) {
        var js = require('../stores/dailyjournal-store.js');
        _dispenser = _.findWhere(js.getData().dispensers, {dispenserIndex: index});
        if (_dispenser) {
            _dispenser.editing = true;
        }
        this.trigger(index);
    },
    cancelEditDispenser: function () {
        _dispenser.editing = false;
        this.trigger();
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
                .push({msg: 'err_previous_not_valid'});
        }
        if (obj.curCounter.length == 0 || isNaN(obj.curCounter)) {
            result.errorMsgs
                .push({msg: 'err_current_not_valid'});
        }
        if (result.errorMsgs.length > 0) {
            return result;
        }
        var validateSemantic = function (obj) {
            var errors = [];
            if (parseFloat(obj.prevCounter) > parseFloat(obj.curCounter)) {
                errors.push({msg: 'err_previous_gt_current'});
            }
            if (parseFloat(obj.prevCounter) === parseFloat(obj.curCounter) && parseFloat(obj.curCounter) == 0) {
                errors.push({msg: 'err_counters_zeros'});
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

var _dispenser = {dispenserIndex: 0, pumpId: 1, prevCounter: 0, curCounter: 0, personnelId: 1, validation: {errorMsgs: []} };


module.exports = DispenserStore;