/** @jsx React.DOM */

var React = require('react');
var DailyJournalStore = require('../../stores/dailyjournal-store.js');
var Debug =
    React.createClass({
        render:function() {
            return (
                <pre>
                    <div dangerouslySetInnerHTML={{__html: DailyJournalStore.pprint(this.props.json)}} />
                </pre>
                ) 
        }
    });

module.exports = Debug;