/** @jsx React.DOM */

var React = require('react');
var DispenserActions = require('../../actions/dispenser-actions.js');
var img_pump = require('../../../images/pump.png');
var Dispenserlink = React.createClass({

    render: function () {
        var data = this.props.data;
        return (
            <div key={this.props.index} className='col-xs-2 col-md-2 col-lg-2'  onClick={this.editDispenser}>
                <span onClick={this.removeDispenser} className='close'>x</span>
                <div className='label label-default '
                data-toggle="modal"
                data-target=".add-dispenser-modal">
                    {data.pump.id}
                </div>

                <img src={img_pump}/>

            </div>
            )
    },
    editDispenser: function () {
        DispenserActions.editDispenser(this.props.index);
    },
    removeDispenser: function () {
        DispenserActions.removeDispenser(this.props.index);
    }
});

module.exports = Dispenserlink;
