'use strict';

var React = require('react');
var Dispenser = require('../../scripts/components/dailyjournal/dispenser.js');
var Dailyjournal = require('../../scripts/components/dailyjournal/dailyjournal.js');
var Journalresults = require('../../scripts/components/dailyjournal/journalresults.js');
var DailyJournalStore = require('../../scripts/stores/dailyjournal-store.js');
var Modal = require('../../scripts/components/common/modal.js');
var Pageheader = require('../../scripts/components/header.js');
var Pagefooter = require('../../scripts/components/footer.js');
var Panel = require('../../scripts/components/common/panel.js');
var Debug = require('../../scripts/components/common/debug.js');
var Dict = require('../../scripts/components/common/dict.js');
var Save = require('../../scripts/components/dailyjournal/save-daily-journals.js');
var _ = require('underscore');


var img_pump = require('../../images/pump.png');

var App = React.createClass({
    getInitialState: function () {
        return DailyJournalStore.getDispensers();
    },
    componentDidMount: function () {
        this.unsubscribe = DailyJournalStore.listen(this.onChange);
    },
    componentWillUnmount: function () {
        this.unsubscribe();
    },
    onChange: function () {
        this.setState(DailyJournalStore.getDispensers());
    },
    render: function () {
        var journalsData = DailyJournalStore.getJournals(this.state.dispensers);
        var journalHeader = Dict.journal;
        return (
            <div className='container' >
                <Pageheader title={Dict.headerTitle} subTitle={Dict.headerSubTitle} />
                <Panel type={'primary'} header={journalHeader}>
                {[
                    <div className='row' key={0} >
                        <div className='col-xs-12 col-md-12 col-lg-12' >
                            <button className="btn btn-default"  data-toggle="modal" data-target=".add-dispenser-modal">
                            +
                                <img src={img_pump}/>
                            </button>
                        </div>
                        <Dispenser modalLink={'add-dispenser-modal'}/>
                    </div>,
                    <div className='row' key={1}>
                        <div className='col-xs-12 col-md-12 col-lg-12' >
                            <Dailyjournal />
                        </div>
                    </div>,
                    <Panel type={"primary"} key={2}>
                        <div className='row ' >
                            <span className='col-xs-12 vcenter' >
                                <Journalresults data={journalsData} /><Save />
                            </span>

                        </div>
                    </Panel>
                ]}
                </Panel>
                <Debug json={DailyJournalStore.getDispensers()}/>
                <Pagefooter title={Dict.footerTitle} subTitle={Dict.footerSubTitle}/>
            </div>
            );
    }
});
React.render(
    <App />
    , document.body); // jshint ignore:line

module.exports = App;
