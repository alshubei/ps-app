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
var PumpsActions = require('../../actions/pumps-actions.js');
var Debug = require('../../components/common/debug.js');
var _ = require('underscore');

var Dispenser = React.createClass({
        getInitialState: function () {
            var data = DispenserStore.getState();
            return data;
        },
        componentDidMount: function () {
            this.unsubscribe = DispenserStore.listen(this._onChange);
            var data = this.state;
            data.validation = DispenserStore.validation({prevCounter: data.prevCounter, curCounter: data.curCounter});
            this.setState(data);

        },
        componentWillUnmount: function () {
            this.unsubscribe();
        },
        _onChange: function () {
            this.setState(DispenserStore.getState());
        },
        content: function () {
            return <div className='input-lg'>
                <div className='row'>
                    <div className='col-xs-12 col-md-2'>
                        <Pumpselect title={Dict.pump} selected={this.state.pumpIndex} onChange={this.handlePumpChange}/>
                    </div>
                    <div className='col-xs-12 col-md-3'>
                        <Pumpcounter title={Dict.previousCounter}
                        onChange={this.handlePrevChange} value={this.state.prevCounter} />
                    </div>
                    <div className='col-xs-12 col-md-4'>
                        <Pumpcounter  title={Dict.currentCounter}
                        onChange={this.handleCurChange} value={this.state.curCounter}  />
                    </div>
                    <div className='top17 col-xs-12'>
                        <span  className="label label-default">{this.state.liters}</span>
                        <span> {Dict.liters} </span>
                        <span className="label label-info">{this.state.subtotal}</span>
                        <span> {Dict.subTotal} </span>
                    </div>
                </div>

            </div>
        },
        render: function () {
            var validation = '';
            if (this.state.validation.errorMsgs.length > 0) {
                var errors = this.state.validation.errorMsgs.map(function (item, i) {
                    return <div key={i} className='text-danger'>{item}</div>
                }.bind(this));
                validation = <Panel type={'danger'}>
                {errors}
                </Panel>;
            }
            return (
                <Modal  modalLink={this.props.modalLink} onSave={this.handleSave} onCancel={this.handleCancel}title={Dict.dispenserModalTitle} saveCaption={'Ok'} closeCaption={'Cancel'} validation={this.state.validation.errorMsgs.length > 0}>
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
        handleCancel: function () {
            //trigger cancel edit
            DispenserActions.cancelEditDispenser(this.state.id);
        },
        handlePumpChange: function (e) {
            var value = e.target.value;
            this.validation = DispenserStore.validation({prevCounter: this.state.prevCounter, curCounter: this.state.curCounter});
            this.updateState({pumpIndex: parseInt(value), validation: this.validation});
        },
        validation: {prevCounter: '', currentCounter: '', errorMsgs: []},
        handlePrevChange: function (e) {
            this.validation = DispenserStore.validation({prevCounter: e.target.value, curCounter: this.state.curCounter});
            this.updateState({prevCounter: e.target.value, validation: this.validation});
        },
        handleCurChange: function (e) {
            this.validation = DispenserStore.validation({prevCounter: this.state.prevCounter, curCounter: e.target.value});
            this.updateState({curCounter: e.target.value, validation: this.validation});

        },
        updateState: function (newData) {
            //plug the newData to the suitable
            _.extend(this.state, newData);
            var subtotals = DispenserStore.calcSubtotals(this.state.pumpIndex, this.state.prevCounter, this.state.curCounter);
            this.setState(_.extend(
                this.state, {
                    liters: subtotals.liters,
                    subtotal: subtotals.subtotal}));

        }
    })
    ;


module.exports = Dispenser;
