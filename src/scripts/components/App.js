'use strict';

var React = require('react');
window.$ = window.jQuery = require('jquery');
//var bootstrap = require('bootstrap');

var Dailyjournal = require('../../scripts/components/dailyjournal/dailyjournal.js');
var Journalresults = require('../../scripts/components/dailyjournal/journalresults.js');
var DailyJournalStore = require('../stores/dailyjournal-store.js');
var LangSwitcherStore = require('../stores/langswitcher-store.js');
var LoginStore = require('../stores/login-store.js');
var DatePickerStore = require('../stores/datepicker-store.js');
var DailyJournalActions = require('../actions/dailyjournal-actions.js');
var Header = require('../../scripts/components/header.js');
var Footer = require('../../scripts/components/footer.js');
var Panel = require('../../scripts/components/common/panel.js');
var Debug = require('../../scripts/components/common/debug.js');
var Dict = require('../components/common/dict.js');
var Date = require('../../scripts/components/common/date-picker.js');
var Langswitcher = require('../../scripts/components/common/langswitcher.js');
var Utils = require('../../scripts/components/common/utils.js');
var DatePickerStore = require('../stores/datepicker-store.js');
var Save = require('../components/dailyjournal/save-daily-journals.js');
var Modal = require('../components/common/modal.js');
var Login = require('../components/common/login.js');

var _ = require('underscore');

var JournalApp = React.createClass({
    getInitialState: function () {
        return DailyJournalStore.getData();
    },
    componentDidMount: function () {
        this.unsubscribe = DailyJournalStore.listen(this.onChange);
        if (this.isMounted()) {
            //DailyJournalActions.fetchJournalsFromServer(DatePickerStore.getDate());
        }
    },
    componentWillUnmount: function () {
        this.unsubscribe();
    },
    render: function () {
        var appContent = '';
        if (LoginStore.getOk() == true) {
        }
        appContent =
            <div className={'app '}>
                <Header />
                <div className='container' dir={LangSwitcherStore.getDefaultDir()}>
                    <Langswitcher />
                </div>
                <div className='container' dir={LangSwitcherStore.getDir()}>
                    <Panel type={'default'} >
                        <Panel type={'default'} >
                            <div className={'Grid flex-start'}>
                                <div className={'Grid-cell mr10'} >
                                    <Date />
                                </div>
                                <div className={'Grid-cell mr10'}>
                                    <Save />
                                </div>
                                <div className={'Grid-cell mr10'}>
                                    <Journalresults />
                                </div>
                            </div>
                        </Panel>
                        <Dailyjournal />
                    </Panel>
                    <Footer  subTitle={Dict.tr('footerSubTitle')}/>
                </div>
            </div>


        return (
            <div>
                <div className={'container'} dir={LangSwitcherStore.getDir()}>
                    <Login className={'login-modal'} show={DailyJournalStore.getData().showLoginModal} />
                </div>
                     {(LoginStore.getOk()) ? appContent : ''}
            </div>
            );
    },
    onChange: function () {
        this.setState(DailyJournalStore.getData());
    }
});

module.exports = JournalApp;


React.render(
    <JournalApp />
    , document.body); // jshint ignore:line


