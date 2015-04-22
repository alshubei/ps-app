'use strict';

var React = require('react');
var _ = require('underscore');
var Dict = require('../common/dict.js');
var JournalResultsStore = require('../../stores/journalresults-store.js');
var DailyJournalStore = require('../../stores/dailyjournal-store.js');
var DailyJournalActions = require('../../actions/dailyjournal-actions.js');

var Savejournals = React.createClass({
    render: function () {
        var journalsData = DailyJournalStore.makeJournals();
        var able = JournalResultsStore.getTotals(journalsData).notSaved > 0;
        return (<button className={'btn btn-primary ' + (able ? ' ' : ' disabled')} onClick={this.handleSave}>
                    {Dict.tr('saveJournals')}
                </button>
            )

    },
    handleSave: function () {
        DailyJournalActions.saveJournals();
    }
});


module.exports = Savejournals;
