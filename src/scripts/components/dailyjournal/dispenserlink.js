/** @jsx React.DOM */

var React = require('react');
var DispenserActions = require('../../actions/dispenser-actions.js');
var PumpsStore = require('../../stores/pumps-store.js');
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
                <img className='cp Grid-cell'
                src={img_pump}
                data-toggle="modal"
                data-target=".add-dispenser-modal"
                onClick={this.editDispenser}
                />
                <div className='label label-default cp Grid-cell w100' data-toggle="modal"
                data-target=".add-dispenser-modal">
                                {pump.pName}
                </div>
            </div>
            )
    },
    editDispenser: function () {
        DispenserActions.editDispenser(this.props.data.dispenserIndex);
    },
    removeDispenser: function () {

        DispenserActions.removeDispenser(this.props.data.dispenserIndex);
    }
});

module.exports = Dispenserlink;
