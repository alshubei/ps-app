'use strict';

var React = require('react');
var DailyJournalStore = require('../../stores/dailyjournal-store.js');
var Journal = require('../../components/dailyjournal/journal.js');
var Debug = require('../../components/common/debug.js');
var _ = require('underscore');

var Dailyjournal = React.createClass({
    getInitialState: function () {
        return DailyJournalStore.getData();
    },
    componentDidMount: function () {
        this.unsubscribe = DailyJournalStore.listen(this.onChange);
    },
    componentWillUnmount: function () {
        this.unsubscribe();
    },
    render: function () {
        //make journals out of dispensers
        var journalsData = DailyJournalStore.getJournals(this.state.dispensers);
        var journals = journalsData.map(function (item, i) {
            return <Journal key={i}   data={item} />;
        });

        return (
                <div className='top10 row'>
                    {journals}
                </div>
            )

    },
    onChange: function () {
        this.setState(DailyJournalStore.getData());
    }
});


module.exports = Dailyjournal;
