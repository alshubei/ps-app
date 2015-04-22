'use strict';

var React = require('react');
var DailyJournalStore = require('../../stores/dailyjournal-store.js');
var Dispenser = require('../../components/dailyjournal/dispenser.js');
var Journal = require('../../components/dailyjournal/journal.js');
var Journalresults = require('../../components/dailyjournal/journalresults.js');
var Panel = require('../../components/common/panel.js');
var Dict = require('../../components/common/dict.js');
var Debug = require('../../components/common/debug.js');
var Save = require('../../components/dailyjournal/save-daily-journals.js');
var PumpsActions = require('../../actions/pumps-actions.js');
var DispenserActions = require('../../actions/dispenser-actions.js');
var _ = require('underscore');
var img_pump = require('../../../images/pump.png');

var Dailyjournal = React.createClass({

    render: function () {
        //make journals out of dispensers
        var journalsData = DailyJournalStore.makeJournals();
        var journals = journalsData.map(function (item, i) {
            return <Journal key={i} data={item} className='Grid-cell  mr10'/>;
        });
        return (
            <div>
                <div className='Grid flex-start'>
                    <div className='Grid-cell ' >
                        <button className="btn btn-default"  onClick={this.handleOpenDispenserModal}>
                            <span>{Dict.tr('plus')} </span>
                            <img src={img_pump}/>
                        </button>
                        <Dispenser show={DailyJournalStore.getData().showDispenserModal}/>
                    </div>
                </div>

                <div className='Grid flex-start top10'>
                    {journals}
                </div>
            </div>
            )
    },
    handleOpenDispenserModal: function () {
        PumpsActions.getPumps();
        DispenserActions.showDispenserModal();
    }
});


module.exports = Dailyjournal;
