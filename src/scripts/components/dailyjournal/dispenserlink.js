/** @jsx React.DOM */

var React = require('react');
var DispenserActions = require('../../actions/dispenser-actions.js');
var DailyJournalActions = require('../../actions/dailyjournal-actions.js');
var PumpsStore = require('../../stores/pumps-store.js');
var DatePickerStore = require('../../stores/datepicker-store.js');
var img_pump = require('../../../images/pump.png');
var Dispenserlink = React.createClass({

    render: function () {
        var dispenser = this.props.data;
        var pump = PumpsStore.getPump(dispenser.pumpId);
        return (
            <div  className={'component component-dispenserlink Grid column-wrap mr10' + (dispenser.saved ? ' saved' : ' ')}  >
                <span className={'Grid-cell w100 close hcenter'} onClick={this.removeDispenser} aria-hidden="true">
                x
                </span>
                <img className='b-gr cp Grid-cell'
                src={img_pump}
                onClick={this.editDispenser}
                />
                <div className='label label-default cp Grid-cell w100' onClick={this.editDispenser}>
                                {pump.pName}
                </div>
            </div>
            )
    },
    editDispenser: function () {
        DispenserActions.editDispenser(this.props.data.dispenserIndex);
        DispenserActions.showDispenserModal();
    },
    removeDispenser: function () {
        DispenserActions.removeDispenser(this.props.data.dispenserIndex);
        DailyJournalActions.getJournalDays(DatePickerStore.getDate());
    }
});

module.exports = Dispenserlink;
