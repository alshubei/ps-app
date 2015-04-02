/** @jsx React.DOM */

var React = require('react');
var Utils = require('../../components/common/utils.js');
var LangSwitcherStore = require('../../stores/langswitcher-store.js');
var LoginStore = require('../../stores/login-store.js');
var LangSwitcherActions = require('../../actions/langswitcher-actions.js');
var LoginActions = require('../../actions/login-actions.js');
var Dict = require('../../components/common/dict.js');

var Langswitcher =
    React.createClass({
        getInitialState: function () {
            return LangSwitcherStore.getState();
        },
        componentDidMount: function () {
            this.unsubscribe = LangSwitcherStore.listen(this._onChange);
        },
        componentWillUnmount: function () {
            this.unsubscribe();
        },
        render: function () {
            return (
                <div className={'component component-langswitcher ' + this.props.className}>
                    <select  value={this.state.lang}  className='lang-switcher' onChange={this.handleLangChange}>
                        <option value={Dict.ar}>{Dict.tr('ar')}</option>
                        <option value={Dict.en}>{Dict.tr('en')}</option>
                    </select>
                </div>
                )
        },
        handleLangChange: function (e) {
            LangSwitcherActions.switchLang(e.target.value);

        },
        _onChange: function () {
            this.setState(LangSwitcherStore.getState());
        }
    });

module.exports = Langswitcher;