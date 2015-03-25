'use strict';

var React = require('react');
var _ = require('underscore');
var Dict = require('../common/dict.js');
var JournalResultsStore = require('../../stores/journalresults-store.js');
var DailyJournalStore = require('../../stores/dailyjournal-store.js');

var Savejournals = React.createClass({
    render: function () {
        var journalsData = DailyJournalStore.getJournals();
        var able = JournalResultsStore.getTotals(journalsData).notSaved > 0;
        return (<span>
                <button className={'btn btn-primary ' + (able ? ' ' : ' disabled')} onClick={this.props.onClick}>
                    {Dict.saveJournals}
                </button>
            </span>
            )

    }
});


module.exports = Savejournals;
