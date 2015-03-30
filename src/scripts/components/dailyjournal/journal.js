'use strict';

var React = require('react');
var JournalStore = require('../../stores/journal-store.js');
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

            <div  className={' component component-journal ' + this.props.className}>
                <div className={'thumbnail ' + (journal.isAllSaved ? ' saved' : ' ')}>
                    <span className={'close closejournal ' + (journal.isSomeSaved ? ' saved' : ' ')} onClick={this.removeJournal}>x</span>
                    <h3>{Dict.tr(journal.fuel)}</h3>
                    <input className={'prev-counter'} type='text' value={journal.prevCounter}/>
                    <input className={'cur-counter'} type='text' value={journal.curCounter}/>
                    <h3 className='nomargin'>
                        <span className=" label label-default">{journal.liters} {Dict.tr('Ltr')}.</span>
                    </h3>
                    <h3 className='nomargin'>
                        <span className=" label label-default">{journal.subtotal} {Dict.tr('YR')}</span>
                    </h3>
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
        /*


         <div className='thumbnail'>
         {dispensers}
         </div>
         */
        DailyJournalActions.removeJournal(this.getJournal().fuel);
    }
});

module.exports = Journal;
