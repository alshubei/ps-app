/** @jsx React.DOM */

var React = require('react');
var DispenserActions = require('../../actions/dispenser-actions.js');
var img_pump = require('../../../images/pump.png');
var Dispenserlink = React.createClass({

    render: function () {
        var data = this.props.data;
        return (
            <div  className='col-xs-2'  onClick={this.editDispenser}>
                <div className='row text-center'>
                    <div onClick={this.removeDispenser} className='col-xs-12 close'>
                        x
                    </div>
                </div>
                <div className='row text-center'>
                    <div className='col-xs-12'>
                        <div className='label label-default '
                        data-toggle="modal"
                        data-target=".add-dispenser-modal">
                                {data.pump.id}
                        </div>
                    </div>
                </div>
                <div className='row text-center'>
                    <div className = 'col-xs-12' >
                        <img src={img_pump}/>
                    </div >
                </div >
            </div >
            )
    },
    editDispenser: function () {
        DispenserActions.editDispenser(this.props.data.index);
    },
    removeDispenser: function () {
        DispenserActions.removeDispenser(this.props.data.index);
    }
});

module.exports = Dispenserlink;
