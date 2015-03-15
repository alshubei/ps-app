'use strict';

var React = require('react');
var Dict = require('../common/dict.js');
var PumpsStore = require('../../stores/pumps-store.js');
var Modal = require('../../components/common/modal.js');
var Panel = require('../../components/common/panel.js');
var Pumpselect = require('../../components/dailyjournal/pumpselect.js');
var Pumpcounter = require('../../components/dailyjournal/pumpcounter.js');
var DispenserStore = require('../../stores/dispenser-store.js');
var DispenserActions = require('../../actions/dispenser-actions.js');
var Debug = require('../../components/common/debug.js');

var Dispenser = React.createClass({
    getInitialState: function () {
        return DispenserStore.getDispenserData();
    },
    componentDidMount: function () {
        this.unsubscribe = DispenserStore.listen(this.onChange);
    },
    componentWillUnmount: function () {
        this.unsubscribe();
    },
    onChange: function () {
        this.setState(DispenserStore.getDispenserData());
    },
    content: function () {
        return <div className='input-lg'>
            <div className='row'>
                <div className='col-xs-12 col-md-2'>
                    <Pumpselect title={Dict.pump + ':'} value={this.state.pump.id} pump={this.getPumpData()} onChange={this.handlePumpChange}/>
                </div>
                <div className='col-xs-12 col-md-3'>
                    <Pumpcounter title={Dict.previousCounter}
                    onChange={this.handlePrevChange} value={this.state.prevCounter} />
                </div>
                <div className='col-xs-12 col-md-4'>
                    <Pumpcounter  title={Dict.currentCounter}
                    onChange={this.handleCurChange} value={this.state.curCounter}  />
                </div>
            </div>
            <div className='top30  row'>
                <div className='col-xs-12'>
                    <span  className="label label-default">{this.state.liters}</span>
                    <span> {Dict.liters} </span>
                    <span className="label label-info">{this.state.subtotal} YR</span>
                    <span> {Dict.subTotal} </span>
                </div>
            </div>
        </div>
    },
    render: function () {
        //<Debug json={this.state}/>
        var validation = '';
        if (!this.state.valid) {
            validation = <Panel type={'danger'}>
                {this.state.validation}
            </Panel>;
        }

        return (
            <Modal onSave={this.handleSave} modalLink={this.props.modalLink} title={Dict.dispenserModalTitle} saveCaption={'Ok'} closeCaption={'Cancel'}>
                <Panel type={'primary'} header={Dict.dispensercounters} >
                            {validation}
                            {this.content()}
                </Panel>

            </Modal>
            )
    },
    handleSave: function () {
        DispenserActions.saveDispenser(this.state);
    },
    getPumpData: function () {
        return PumpsStore.getPump(this.state.pump.id);
    },
    handlePumpChange: function (e) {
        var value = e.target.value;
        this.updateState(value, this.state.prevCounter, this.state.curCounter, this.state.valid);
    },
    handlePrevChange: function (e) {
        var prevValue = e.target.value;
        if (prevValue.length == 0 || isNaN(prevValue)) {
            this.updateState(this.state.pump.id, prevValue,
                this.state.curCounter, false);
        } else{
            this.updateState(this.state.pump.id, prevValue,
                this.state.curCounter, true);
        }
    },
    handleCurChange: function (e) {
        var currentValue = e.target.value;
        if (currentValue.length == 0 || isNaN(currentValue)) {
            this.updateState(this.state.pump.id, this.state.prevCounter, currentValue, false)        } else{
            this.updateState(this.state.pump.id, this.state.prevCounter, currentValue, true);
        }

    },
    updateState: function (pump, prevValue, currentValue, valid) {
        var subtotals = DispenserStore.calcSubtotals(pump, prevValue, currentValue);
        return this.setState({liters: parseFloat(subtotals.liters), subtotal: parseFloat(subtotals.subtotal), pump: PumpsStore.getPump(pump), prevCounter: prevValue, curCounter: currentValue, valid: valid});

    }
});


module.exports = Dispenser;
