'use strict';

var React = require('react');
var Dailyjournal = require('../../scripts/components/dailyjournal/dailyjournal.js');
var Journalresults = require('../../scripts/components/dailyjournal/journalresults.js');
var DailyJournalStore = require('../stores/dailyjournal-store.js');
var DatePickerStore = require('../stores/datepicker-store.js');
var DailyJournalActions = require('../actions/dailyjournal-actions.js');

var Header = require('../../scripts/components/header.js');
var Footer = require('../../scripts/components/footer.js');
var Panel = require('../../scripts/components/common/panel.js');
var Debug = require('../../scripts/components/common/debug.js');
var Dict = require('../../scripts/components/common/dict.js');
var Date = require('../../scripts/components/common/date-picker.js');
var Utils = require('../../scripts/components/common/utils.js');
var DatePickerStore = require('../stores/datepicker-store.js');
var _ = require('underscore');

var JournalApp = React.createClass({
    getInitialState: function () {
        return DailyJournalStore.getData();
    },
    componentDidMount: function () {
        this.unsubscribe = DailyJournalStore.listen(this.onChange);
        if (this.isMounted()) {
            DailyJournalActions.getJournals(DatePickerStore.getDate());
        }
    },
    componentWillUnmount: function () {
        this.unsubscribe();
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        return true;
    },
    render: function () {
        return (
            <div className='container' >
                <Header>
                    <Date />
                    <Journalresults />
                </Header>

                <Panel type={'primary'} header={Dict.journal}>
                   <Dailyjournal />
                </Panel>
                <Footer title={Dict.footerTitle} subTitle={Dict.footerSubTitle}/>
            </div>
            );
    },
    onChange: function () {
        this.setState(DailyJournalStore.getData());
    }
});


module.exports = JournalApp;
