/** @jsx React.DOM */

var React = require('react');
var Dailyjournalstore = require('../../stores/dailyjournal-store.js');

var Journalresults = React.createClass({

    render: function () {
        return (
            <div>
                <div className='row'>
                    <strong>Total Amount: </strong>
                    <span className='label label-primary'>{this.props.data}</span>
                </div>
            </div>

            )
    }
});

module.exports = Journalresults;
