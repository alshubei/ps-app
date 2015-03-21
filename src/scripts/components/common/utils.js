'use strict'

var _ = require('underscore');
var PumpsStore = require('../../stores/pumps-store.js');
module.exports = {
    prepareInsertToDispensers: function (dispensers) {
        return _.map(dispensers, function (o) {
            return _.extend(o,{pid: PumpsStore.getPump(o.pumpIndex)}.pid);
        });
    }
};