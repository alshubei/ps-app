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
                <strong>{Dict.totalAmount}: </strong>
                <span className='label label-primary'>{totals.notSaved}</span>
                <span className='label label-default'>{totals.saved}</span>
                <span className='label label-info'>{totals.saved + totals.notSaved}</span>
            </span>
        },
        render: function () {
            return (
                <span className='input-lg'>
                    {this.content()}
                </span>)
        }
    })
    ;

module.exports = Journalresults;
