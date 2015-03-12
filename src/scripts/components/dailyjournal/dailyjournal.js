'use strict';

var React = require('react');
var Dailyjournalstore = require('../../stores/dailyjournal-store.js');
var Journal = require('../../components/dailyjournal/journal.js');

var Dailyjournal = React.createClass({
    getInitialState: function () {
        return Dailyjournalstore.getDailyJournal();
    },
    componentDidMount: function () {
      this.unsubscribe = Dailyjournalstore.listen(this.onChange);
    },
    componentWillUnmount: function () {
      this.unsubscribe();
    },
    render: function () {

        var journals = this.state.data.map(function (item) {
            return <Journal data={item} />;
        });

        return (
            <div className='row'>
                {journals}
            </div>
            )
    },
    onChange: function () {
        this.setState(Dailyjournalstore.getDailyJournal());
    }
});


module.exports = Dailyjournal;
