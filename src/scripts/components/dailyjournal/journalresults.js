/** @jsx React.DOM */

var React = require('react');
var JournalResultsStore = require('../../stores/journalresults-store.js');
var Dict = require('../common/dict.js');

var Journalresults = React.createClass({

    render: function () {
        var totals = JournalResultsStore.getTotals(this.props.data);
        return (
            <span className='input-lg'>
                <strong>{Dict.totalAmount}: </strong>
                <span className='label label-primary'>{totals.notSaved}</span>
                <span className='label label-default'>{totals.saved}</span>
            </span>

            )
    }
});

module.exports = Journalresults;
