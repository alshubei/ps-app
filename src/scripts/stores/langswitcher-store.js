
var Reflux = require('reflux');
var _ = require('underscore');

var LangSwitcherActions = require('../actions/langswitcher-actions.js');

var LangSwitcherStore = Reflux.createStore({
    listenables: [LangSwitcherActions],
    switchLang: function (newLang) {
        _state.lang = newLang;
        this.trigger(newLang);
    },
    getState: function () {
      return _state;
    },
    getDefaultDir: function () {
        return 'rtl';
    },
    getDefaultLang: function () {
        return 'ar';
    },
    getDir: function () {
        switch (_state.lang) {
            case 'ar': return 'rtl'; break;
            case 'en': return 'ltr'; break;
        }
    },
    getLang: function () {
        return _state.lang;
    }
});

var  _state = {lang: LangSwitcherStore.getDefaultLang()};




module.exports = LangSwitcherStore;