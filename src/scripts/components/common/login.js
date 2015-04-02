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
                React.findDOMNode(this.refs.user).focus();
            }.bind(this), 100)
        },
        componentWillUnmount: function () {
            this.unsubscribe();
        },
        content: function () {
            return <div className={'Grid flex-start'}>
                <label className='Grid-cell mr10'>{Dict.tr('loginName')}
                    <span> </span>
                    <input autoFocus  ref='user'  type='text' />
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
                <div className={'component component-login ' + (!this.props.show ? 'out' : '')} onKeyPress={this.handleKeyPress}>
                    <div className={' '}  tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className={"modal-backdrop fade " + (this.props.show ? "  in" : "")}></div>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header" >
                                    <div dir={LangSwitcherStore.getDefaultDir()}>
                                        <Langswitcher className={'inlogin'}/>
                                    </div>
                                    <br/>
                                    <p className="modal-title label label-info input-lg-2">{Dict.tr('loginTitle')}</p>
                                    <span>  {Dict.tr('login_err_attemp') + ': ' + LoginStore.getAttemptNr()}</span>
                                </div>
                                <div className="modal-body">
                                {this.content()}
                                {validation}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className={"btn  btn-primary"} data-dismiss='' onClick={this.handleLogin}>{Dict.tr('loginClickCaption')}</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
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