/** @jsx React.DOM */

var React = require('react');
var Utils = require('../../components/common/utils.js');
var LoginStore = require('../../stores/login-store.js');
var LangSwitcherStore = require('../../stores/langswitcher-store.js');
var LoginActions = require('../../actions/login-actions.js');
var Dict = require('../../components/common/dict.js');
var Modal = require('../../components/common/modal.js');
var Langswitcher = require('../../components/common/langswitcher.js');

var Login =
    React.createClass({
        getInitialState: function () {
            return LoginStore.getState();
        },
        componentDidMount: function () {
            this.unsubscribe = LoginStore.listen(this._onChange);
            LoginActions.showLoginModal();
            setTimeout(function () {
                if (React.findDOMNode(this.refs.user)) React.findDOMNode(this.refs.user).focus();
            }.bind(this), 100);
        },
        componentWillUnmount: function () {
            this.unsubscribe();
        },
        content: function () {
            return <div className={'component component-login Grid flex-start'}>
                <label className='Grid-cell mr10'>{Dict.tr('loginName')}
                    <span> </span>
                    <input autoFocus  ref='user'   type='text' />
                </label>
                <label className='Grid-cell mr10'>{Dict.tr('loginPass')}
                    <span> </span>
                    <input ref='pwd'  type='password'></input>
                </label>
            </div>
        },
        render: function () {
            var validation = [];
            if (this.state.validation.length > 0) {
                var errors = this.state.validation.map(function (item, i) {
                    return <p key={i} className='nomargin'>{Dict.tr(item)}</p>;
                }.bind(this));
                validation = <div className={'validation hb1' + (LoginStore.getOk() == true ? ' hide' : ' ')}>
                    {errors}
                </div>
            }
            return (
                <Modal
                show={this.props.show}
                saveCaption={Dict.tr('loginClickCaption')}
                title={Dict.tr('loginTitle')}
                onSave={this.handleLogin}
                onKeyPress={this.handleKeyPress}
                >
                    <div className='container' dir={LangSwitcherStore.getDefaultDir()}>
                        <Langswitcher />
                    </div>
                    {this.content()}
                    {validation}
                </Modal>
                )
        },
        handleKeyPress: function (e) {
            if (e.charCode == 13) {
                this.handleLogin();
            }
        },
        handleLogin: function () {
            var user = this._getUserData();
            LoginActions.login(user);

        },
        _onChange: function () {
            this.setState(LoginStore.getState());
        },
        _getUserData: function () {
            var userId = React.findDOMNode(this.refs.user).value;
            var pwd = React.findDOMNode(this.refs.pwd).value;
            return {userId: userId, pwd: pwd};

        }
    });

module.exports = Login;