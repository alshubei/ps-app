'use strict';

var React = require('react');
var Dict = require('../../components/common/dict.js');
var Utils = require('../../components/common/utils.js');
var DailyJournalStore = require('../../stores/dailyjournal-store.js');
var DailyJournalActions = require('../../actions/dailyjournal-actions.js');
var DatePickerActions = require('../../actions/datepicker-actions.js');
var DatePickerStore = require('../../stores/datepicker-store.js');

var JournalsCalendar = React.createClass({
    componentDidMount: function () {
        DailyJournalActions.getJournalDays(DatePickerStore.getDate());
    },
    render: function () {
        var journalsData = DailyJournalStore.getData().journalDays;
        var journals = journalsData.map(function (item,i) {
            return <span
            className={'item Grid-cell mr5 label label-default cp '
                + (item.current ? 'current-journal-day ' : '')
                + (item.saved ? ' saved-journal-day ' : '')}
            key={i}
            onClick={this.handleClick}>
                {item.date}
            </span>;
        }.bind(this));
        return (
            <div  className={'component component-journals-calendar Grid flex-start ' + (this.props.className || '')}>
                {journals}
            </div >
            )
    },
    handleClick: function (e) {
        DatePickerActions.changeDate(e.target.innerText);
        DailyJournalActions.viewJournals({
            date: e.target.innerText,
            user: (DailyJournalStore.getData().filterByAllUsers ? null : DailyJournalStore.getData().user)});

    }
});

module.exports = JournalsCalendar;
