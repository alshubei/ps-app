
//var DispenserActions = require('../actions/pumps-actions.js');
var Reflux = require('reflux');
var _ = require('underscore');

var pricesStore = Reflux.createStore({
    init: function () {
        //this.listenToMany(DispenserActions);
    },
    getPrice: function (id) {
        return _getPrice(_fuelTypes,id);
    }
});

var _fuelTypes = [
    {id:'Petorl', price: 100},
    {id:'Diesel', price: 80},
    {id:'Kerosin', price: 60},
    {id:'Gas', price: 45}
];

var _getPrice = function (types, id) {
    var result = _.findWhere(types,{id: id});
    return (result === undefined ? 0 : result.price);
};

module.exports = pricesStore;