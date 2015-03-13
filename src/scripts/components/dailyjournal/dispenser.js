'use strict';

var React = require('react');
var l = require('../../loader.js');
var pumpsStore = require('../../stores/pumps-store.js');
var dispenserStore = require('../../stores/dispenser-store.js');
var dispenserActions = require('../../actions/dispenser-actions.js');

var Dispenser = React.createClass({
    getInitialState: function () {
        //fix it to follow the default option selected or configured
        return dispenserStore.getDispenserData();//{liters: 0, subtotal: 0, pump: {id:'p1'}, prevCounter: 0, curCounter: 0 };
    },
    render: function () {
        return (
            <l.Modal onSave={this.handleSave} modalLink={this.props.modalLink}>
                <l.Panel title={l.dict.dispensercounters}>
                            {[<l.Pumpselect value={this.state.pump.id} pump={this.getPumpData()} onChange={this.handlePumpChange}/>,
                                <l.Pumpcounter placeHolder={l.dict.previouscounter}
                                onChange={this.handlePrevChange} value={this.state.prevCounter} />,
                                <l.Pumpcounter placeHolder={l.dict.currentcounter}
                                onChange={this.handleCurChange} value={this.state.curCounter}  />,
                                <a href={'#'}>
                                    <span className="label label-default">{this.state.liters}</span>
                                    <span> Liter </span></a>,
                                <a href={'#'}>
                                    <span className="label label-info">{this.state.subtotal} YR</span>
                                 <span> Subtotal </span></a>
                            ]}
                </l.Panel>
            </l.Modal>
            )
    },
    handleSave: function () {
        dispenserActions.addEntry(this.state);
    },
    getPumpData: function () {
        return pumpsStore.getPump(this.state.pump.id);
    },
    handlePumpChange: function (e) {
        var value = e.target.value;
        this.updateState(value, this.state.prevCounter, this.state.curCounter);
    },
    handlePrevChange: function (e) {
        var prevValue = e.target.value;
        this.updateState(this.state.pump.id, prevValue, this.state.curCounter);
    },
    handleCurChange: function (e) {
        var currentValue = e.target.value;
        this.updateState(this.state.pump.id, this.state.prevCounter, currentValue);
    },
    updateState: function (pump, prevValue, currentValue) {
        var subtotals = l.Dispenserstore.calcSubtotals(pump, prevValue, currentValue);
        return this.setState({liters: parseFloat(subtotals.liters), subtotal: parseFloat(subtotals.subtotal), pump:  pumpsStore.getPump(pump), prevCounter: parseFloat(prevValue), curCounter: parseFloat(currentValue)});

    }
});


module.exports = Dispenser;
