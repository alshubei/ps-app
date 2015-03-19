'use strict';

var React = require('react');

var PumpsStore = require('../../stores/pumps-store.js');
var PumpsActions = require('../../actions/pumps-actions.js');
var Dict = require('../common/dict.js');


var Pumpselect = React.createClass({
    getInitialState: function () {
        console.log('V) initial state: ', PumpsStore.getState().pumps);
        return PumpsStore.getState();
    },
    componentDidMount: function () {
        this.unsubscribe = PumpsStore.listen(this._onChange);
        if (this.isMounted()) {
            this.getPumpsDataIfNeeded();
        }

    },
    componentWillUnmount: function () {
        this.unsubscribe();
    },
    getPumpsDataIfNeeded: function () {
        console.log('V) View talks to Actions fetchDataFromServer is triggered');
        PumpsActions.fetchDataFromServer();
        PumpsActions.setActivePump(0);

    },
    render: function () {
        var pumps = this.state.pumps.map(function (item, i) {
            return <option key={i} value={item.pid}>{item.pname}-{item.fname}</option>
        }.bind(this));
        return (
            <div>
                <div>{this.props.title}</div>
                <div>
                    <select   value={this.props.value} onChange={this.props.onChange}>
                        {pumps}
                    </select>
                </div>
                <div className="label label-default">{this.props.pump.fname},  {this.props.pump.fprice}/{Dict.liter} </div>
            </div>
            )
    },
    _onChange: function () {
        console.log('V) State is updated -> Re-render, State: ', PumpsStore.getState());
        this.setState(PumpsStore.getState());
    }
});


module.exports = Pumpselect;
