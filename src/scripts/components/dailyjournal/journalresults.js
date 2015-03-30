/** @jsx React.DOM */

var React = require('react');
var JournalResultsStore = require('../../stores/journalresults-store.js');
var DailyJournalStore = require('../../stores/dailyjournal-store.js');
var Dict = require('../common/dict.js');

var Journalresults = React.createClass({

        content: function () {
            var journalsData = DailyJournalStore.getJournals();
            var totals = JournalResultsStore.getTotals(journalsData);
            return <span>
                <strong>{Dict.tr('totalAmount')}: </strong>
                <div className={'label label-default ' + (totals.notSaved == 0 ? ' hide' : '') }>{totals.notSaved}</div>
                <div className={'label label-default gr2' + (totals.saved == 0 ? ' hide' : '')}>{totals.saved}</div>
                <div className='label label-primary'>{totals.saved + totals.notSaved}</div>
            </span>
        },
        render: function () {
            return (
                <div className='component component-journalresults input-lg'>
                    {this.content()}
                </div>)
        }
    })
    ;

module.exports = Journalresults;
