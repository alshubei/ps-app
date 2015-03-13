
//var Dispenseractions = require('../actions/pumps-actions.js');
var Reflux = require('reflux');
var _ = require('underscore');

var pricesStore = Reflux.createStore({
    init: function () {
        //this.listenToMany(Dispenseractions);
    },
    getPrice: function (id) {
        return _getPrice(_fuelTypes,id);
    }
});

var _fuelTypes = [
    {id:'Petrol', price: 130},
    {id:'Diesel', price: 120},
    {id:'Gas', price: 70}
];

var _getPrice = function (types, id) {
    var result = _.findWhere(types,{id: id});
    return (result === undefined ? 0 : result.price);
};

module.exports = pricesStore;