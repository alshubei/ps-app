'use strict';

var React = require('react');

var pumpsStore = require('../../stores/pumps-store.js');


var Pumpselect = React.createClass({
    getInitialState: function () {
        return {pumps: pumpsStore.getPumpList()};
    },
    render: function () {
        var pumps = this.state.pumps.map(function (item) {
            return <option value={item.id}>{item.id}</option>
        }.bind(this));
        return (
            <div>
                <select  value={this.props.value} onChange={this.props.onChange}>
                {pumps}
                </select>
                 <span className="label label-default">{this.props.pump.fuel},  {this.props.pump.literprice}/Liter </span>
            </div>
            )
    }
});


module.exports = Pumpselect;
