var Reflux = require('reflux');
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
    getPumps: function (callback) {
        //Only if server didn't execute PHP.
        if (window.location.host === 'localhost:8000') {
            return;
        }
        jQuery.get("server/query.php?data=pumps", function (result) {
            //cast from PHP resulting strings to correct (MYSQL) datatypes
            var list = _.map(JSON.parse(result), function (o) {
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
    {pumpId: 3, pName: 'd1', fId: 1, fName: 'Diesel', fPrice: 85},
    {pumpId: 4, pName: 'k1', fId: 2, fName: 'Kerosin', fPrice: 70},
    {pumpId: 5, pName: 'g1', fId: 3, fName: 'Gas', fPrice: 60}
];

/*
 ,
 {pumpId: 2, pName: 'p2', fId: 0, fName: 'Petrol', fPrice: 100},
 {pumpId: 3, pName: 'd1', fId: 1, fName: 'Diesel', fPrice: 85}
 */

module.exports = PumpsStore;