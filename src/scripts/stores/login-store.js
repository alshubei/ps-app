var Reflux = require('reflux');
var _ = require('underscore');
var Dict = require('../components/common/dict.js');

var LoginActions = require('../actions/login-actions.js');
var LangSwitcherActions = require('../actions/langswitcher-actions.js');

var LoginStore = Reflux.createStore({
        listenables: [LoginActions],
        login: function (user) {
            _state.validation = [];
            if (_validateInputs(user)) {
                if (window.location.host === 'localhost:8000') {
                    if (user.userId == 'mokhtar') {
                        _updateState(user, true);
                    } else {
                        _updateState(user, false);
                    }

                } else {
                    jQuery.post('server/query.php?data=verifyuser', user, function (response, status) {
                        if (response == '1') {
                            _updateState(user, true);
                        } else {
                            _updateState(user, false);
                        }
                        this.trigger(user);
                    }.bind(this));
                }
            }
            this.trigger(user);
        },
        hideLoginModal: function () {
            this.trigger();
        },
        getState: function () {
            return _state;
        },
        getOk: function () {
            return _state.ok;
        },
        getUser: function () {
            return _state;
        },
        reset: function () {
            _state = {userId: '', attempts: _state.attempts, ok: false, validation: []};
        },
        getAttemptNr: function () {
            return _state.attempts;
        }

    })
    ;

var _state = {userId: '', attempts: 0, ok: false, validation: []};
var _updateState = function (user, ok) {
    if (ok) {
        _state.userId = user.userId;
        _state.ok = true;
        _state.attempts = 0;
        LoginActions.hideLoginModal();
    } else {
        _state.validation.push('err_user_pwd_notvalid');
        _state.attempts += 1;
        //_state.userId = '';
        _state.ok = false;
    }
}
var _validateInputs = function (user) {
    if (user.userId.length == 0) {
        _state.validation.push('err_user_id_empty');
    }
    if (user.pwd.length == 0) {
        _state.validation.push('err_pwd_empty');
    }
    if (_state.validation.length > 0) {
        _state.attempts += 1;
        return false;
    } else
        return true;
}
module.exports = LoginStore;