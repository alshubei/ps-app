'use strict';

var Loader = require('react-loader');

var React = require('react');
window.$ = window.jQuery = require('jquery');
//var bootstrap = require('bootstrap');
var Dict = require('../components/common/dict.js');
var Langswitcher = require('../components/common/langswitcher.js');
var DailyJournalStore = require('../stores/dailyjournal-store.js');


var _ = require('underscore');

var Login = React.createClass({
    render: function () {
        return (
            <div className="container">
                <Langswitcher />
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="login-panel panel panel-success">
                            <div className="panel-heading">
                                <h3 className="panel-title">{Dict.tr('Sign In')}</h3>
                            </div>
                            <div className="panel-body">
                                <form role="form" method="post" action="login/login.php">
                                    <fieldset>
                                        <div className="form-group"  >
                                            <input className="form-control" placeholder={Dict.tr('E-mail')} name="email" type="email" autoFocus />
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" placeholder={Dict.tr('Password')} name="pass" type="password" />
                                        </div>
                                        <input className="btn btn-lg btn-success btn-block" type="submit" value={Dict.tr('login')} name="login" />
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                        <a href='login/admin_login.php' className='gr-color'>{Dict.tr('admin')}</a>
                    </div>
                </div>
            </div>

            );
    }
});

module.exports = Login;