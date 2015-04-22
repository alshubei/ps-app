/** @jsx React.DOM */

var React = require('react');
var JournalResultsStore = require('../../stores/journalresults-store.js');
var DailyJournalStore = require('../../stores/dailyjournal-store.js');
var Dict = require('../common/dict.js');

var Journalresults = React.createClass({

        content: function () {
            var journalsData = DailyJournalStore.makeJournals();
            var totals = JournalResultsStore.getTotals(journalsData);
            return <div>
                <strong>{Dict.tr('totalAmount')}: </strong>
                <strong className={'label label-default ' + (totals.notSaved == 0 ? ' hide' : '') }>{totals.notSaved}</strong>
                <strong className={'label label-default gr2' + ((totals.saved == 0 || totals.notSaved == 0) ? ' hide' : '')}>{totals.saved}</strong>
                <strong className={'label label-primary ' + ((totals.notSaved > 0) ? ' ' : 'primary saved')}>{totals.saved + totals.notSaved}</strong>
            </div>
        },
        render: function () {
            return (
                <div className='component component-journalresults'>
                    {this.content()}
                </div>)
        }
    })
    ;

module.exports = Journalresults;
