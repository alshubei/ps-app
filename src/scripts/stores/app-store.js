
var Reflux = require('reflux');
var _ = require('underscore');

var appStore = Reflux.createStore({
    listenables: [],
    getState: function () {
        return _state;
    }
});

var _state = { showResults: false};



module.exports = appStore;