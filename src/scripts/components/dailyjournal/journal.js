'use strict';

var React = require('react');
var JournalStore = require('../../stores/journal-store.js');
var DatePickerStore = require('../../stores/datepicker-store.js');
var Dispenserlink = require('../../components/dailyjournal/dispenserlink.js');
var Debug = require('../../components/common/debug.js');
var DailyJournalActions = require('../../actions/dailyjournal-actions.js');
var Dict = require('../../components/common/dict.js');

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

            <div  className={'component component-journal ' + this.props.className}>
                <div className={'thumbnail modal-content' + (journal.isAllSaved ? ' saved' : ' ')}>
                    <span className={'close closejournal ' + (journal.isSomeSaved ? ' saved' : ' ')} onClick={this.removeJournal}>x</span>
                    <h4>{Dict.tr(journal.fuel)}</h4>
                    <input className={'prev-counter'} type='text' value={journal.prevCounter}/>
                    <input className={'cur-counter'} type='text' value={journal.curCounter}/>
                    <h4 className='nomargin-2'>
                        <span className=" label label-default">{journal.liters} {Dict.tr('Ltr')}.</span>
                    </h4>
                    <h4 className='nomargin-2'>
                        <span className=" label label-default">{journal.subtotal} {Dict.tr('YR')}</span>
                    </h4>
                    <div className=' dispensers thumbnail'>
                        <div className='Grid flex-start'>
                            {dispensers}
                        </div>
                    </div>
                </div>
            </div >


            )
    },
    removeJournal: function () {
        DailyJournalActions.removeJournal(this.getJournal().fuel);
        DailyJournalActions.getJournalDays(DatePickerStore.getDate());
    }
});

module.exports = Journal;
