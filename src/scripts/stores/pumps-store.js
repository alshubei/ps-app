var Reflux = require('reflux');
var PricesStore = require('../../scripts/stores/prices-store.js');
var PumpsActions = require('../../scripts/actions/pumps-actions.js');
var _ = require('underscore');


var PumpsStore = Reflux.createStore({
    listenables: [PumpsActions],
    getState: function () {
        return {pumps: _pumpsList};
    },
    getPump: function (id) {
        return _.findWhere(_pumpsList, {pumpId: id});
    },
    fetchPumpsFromServer: function (callback) {
        $.get("server/query.php?data=pumps", function (result) {
            //Only if server didn't execute PHP.
            if (result.startsWith('<?php')) {
                return;
            }
            //cast from PHP resulting strings to correct (MYSQL) datatypes
            console.log('JSON.parse(result)',JSON.parse(result));
            var list =  _.map(JSON.parse(result), function (o) {
                    return _.extend(o, {pumpId: parseInt(o.pumpId)});
                });

            _pumpsList = list;
            this.trigger();

            if (callback) callback();
        }.bind(this));

    }
});
//corresponds to a view from the DB build from the pumps, fuels tables
var _pumpsList = [
    {pumpId: 1, pName: 'p1', fId: 0, fName: 'Petrol', fPrice: 100},
    {pumpId: 2, pName: 'p2', fId: 0, fName: 'Petrol', fPrice: 100},
    {pumpId: 3, pName: 'd1', fId: 1, fName: 'Diesel', fPrice: 85}
];


module.exports = PumpsStore;