'use strict';

var React = require('react');
var JournalStore = require('../../stores/journal-store.js');
var DailyJournalStore = require('../../stores/dailyjournal-store.js');
var Dispenserlink = require('../../components/dailyjournal/dispenserlink.js');
var Debug = require('../../components/common/debug.js');
var DailyJournalActions = require('../../actions/dailyjournal-actions.js');

var Journal = React.createClass({
    getJournal: function () {
        var data = this.props.data;
        var journal = JournalStore.calculateJournal(data);
        return journal;
    },
    render: function () {
        var data = this.props.data;
        var journal = this.getJournal();
        var dispensers = data[1].map(function (item, i) {
            return <Dispenserlink key={i}  data={item}/>
        });
        return (
            <div  className={'col-xs-12 col-md-6 col-lg-4 '}>
                <div  className={'thumbnail ' + (journal.isAllSaved ? ' saved' : ' ')}>
                    <span className={'close ' + (journal.isSomeSaved ? ' saved' : ' ')} onClick={this.removeJournal}>x</span>
                    <h3>{journal.fuel}</h3>
                    <div>Prev:
                        <span className="label label-default">{journal.prevCounter}</span>
                    </div>
                    <div>Cur:
                        <span className="label label-default">{journal.curCounter}</span>
                    </div>
                    <div>Due Liters:
                        <span className="label label-default">{journal.liters}</span>
                    </div>
                    <div>Due Amount:
                        <span className="label label-info">{journal.subtotal}</span>
                    </div>
                    <br />
                    <div className='thumbnail row'>
                            {dispensers}
                    </div>
                </div>
            </div>

            )
    },
    removeJournal: function () {
        DailyJournalActions.removeJournal(this.getJournal().fuel);
    }
});

module.exports = Journal;
