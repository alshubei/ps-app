/** @jsx React.DOM */

var React = require('react');
var JournalResultsStore = require('../../stores/journalresults-store.js');
var Dict = require('../common/dict.js');

var Journalresults = React.createClass({

    render: function () {
        var results = JournalResultsStore.getTotals(this.props.data);
        return (
            <span className='input-lg'>
                <strong>{Dict.totalAmount}: </strong>
                <span className='label label-primary'>{results}</span>
            </span>

            )
    }
});

module.exports = Journalresults;
