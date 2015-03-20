/** @jsx React.DOM */

var React = require('react');
var DispenserActions = require('../../actions/dispenser-actions.js');
var PumpsStore = require('../../stores/pumps-store.js');
var img_pump = require('../../../images/pump.png');
var Dispenserlink = React.createClass({

    render: function () {
        var dispenser = this.props.data;
        var pump = PumpsStore.getPump(dispenser.pumpIndex);
        return (
            <div  className='col-xs-2'  >
                <div className='row text-center'>
                    <div onClick={this.removeDispenser} className='col-xs-12 close'>
                        <span>x</span>
                    </div>
                </div>
                <div  onClick={this.editDispenser}>
                    <div className='row'>
                        <div className = 'col-xs-12' >
                            <img className='cp' src={img_pump} data-toggle="modal"
                            data-target=".add-dispenser-modal" />
                        </div >
                    </div>
                    <div className='row '>
                        <div className='col-xs-12'>
                            <div className='label label-default cp' data-toggle="modal"
                            data-target=".add-dispenser-modal">
                                {pump.pname}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
    },
    editDispenser: function () {
        DispenserActions.editDispenser(this.props.data.id);
    },
    removeDispenser: function () {
        DispenserActions.removeDispenser(this.props.data.id);
    }
});

module.exports = Dispenserlink;
