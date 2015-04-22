'use strict';

var React = require('react');
var logo = require('../../images/logo.png');
var DailyJournalStore = require('../stores/dailyjournal-store.js');
var LangSwitcherStore = require('../stores/langswitcher-store.js');
var Dict = require('../components/common/dict.js');


var header = React.createClass({
    render: function () {
        return (<div className={'component component-header navbar-fixed-top'} >
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className='logged-user' dir={LangSwitcherStore.getDefaultDir()}>
                        <div>
                            {Dict.tr('logged_as')}:
                            <span>{DailyJournalStore.getUser().userName}</span>
                        </div>
                        <div>
                            <a className='logout-link' href={(DailyJournalStore.getUser().userId == -1 ? '' : 'login/logout.php') }>{Dict.tr('log_out')}</a>
                        </div>
                    </div>
                    <div className="navbar-header" >
                        <a className="navbar-brand navbar-left" href="#" >
                            <img alt="Brand" src={logo} />
                        </a>
                    </div>
                </div>
            </nav>
        </div>

            )

    }
});


module.exports = header;
