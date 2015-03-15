'use strict';

var React = require('react');

var PumpsStore = require('../../stores/pumps-store.js');
var Dict = require('../common/dict.js');


var Pumpselect = React.createClass({
    getInitialState: function () {
        return {pumps: PumpsStore.getPumpList()};
    },
    render: function () {
        var pumps = this.state.pumps.map(function (item, i) {
            return <option key={i} value={item.id}>{item.id}</option>
        }.bind(this));
        return (
            <div>
                <div>{this.props.title}</div>
                <div>
                    <select   value={this.props.value} onChange={this.props.onChange}>
                        {pumps}
                    </select>
                </div>
                <div className="label label-default">{this.props.pump.fuel},  {this.props.pump.literprice}/{Dict.liter} </div>
            </div>
            )
    }
});


module.exports = Pumpselect;
