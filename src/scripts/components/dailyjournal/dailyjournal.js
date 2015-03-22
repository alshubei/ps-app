'use strict';

var React = require('react');
var DailyJournalStore = require('../../stores/dailyjournal-store.js');
var DatePickerStore = require('../../stores/datepicker-store.js');
var JournalResultsStore = require('../../stores/journalresults-store.js');
var PumpsStore = require('../../stores/pumps-store.js');
var Dispenser = require('../../components/dailyjournal/dispenser.js');
var Journal = require('../../components/dailyjournal/journal.js');
var Journalresults = require('../../components/dailyjournal/journalresults.js');
var Panel = require('../../components/common/panel.js');
var Debug = require('../../components/common/debug.js');
var Save = require('../../components/dailyjournal/save-daily-journals.js');
var DailyJournalActions = require('../../actions/dailyjournal-actions.js');
var PumpsActions = require('../../actions/pumps-actions.js');
var _ = require('underscore');
var img_pump = require('../../../images/pump.png');

var Dailyjournal = React.createClass({
    getInitialState: function () {
        return DailyJournalStore.getData();
    },
    componentDidMount: function () {
        this.unsubscribe = DailyJournalStore.listen(this.onChange);
        if (this.isMounted()) {
            DailyJournalActions.fetchJournalsFromServer(DatePickerStore.getState().date);
        }

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
            <div>
            {DatePickerStore.getState().date}
                <div className='row'>
                    <div className='col-xs-12 col-md-12 col-lg-12' >
                        <button className="btn btn-default"  data-toggle="modal" data-target=".add-dispenser-modal">
                            <span>+ </span>
                            <img src={img_pump}/>
                        </button>
                        <Dispenser modalLink={'add-dispenser-modal'}/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-xs-12 col-md-12 col-lg-12' >
                        <div className='top10 row'>
                            <span>{journals}</span>
                        </div>
                    </div>
                </div>
                <div className='row' >
                    <span className='col-xs-12 vcenter' >
                        <Panel type={'primary'} >
                            <Journalresults data={journalsData} />
                            <Save onClick={this.handleSaveJournals} able={JournalResultsStore.getTotals(journalsData).notSaved > 0}/>

                        </Panel>
                    </span>
                </div>
            </div>
            )
    },
    handleSaveJournals: function () {
        DailyJournalActions.saveJournalsInServer();
    },
    onChange: function () {
        this.setState(DailyJournalStore.getData());
    }
});


module.exports = Dailyjournal;
