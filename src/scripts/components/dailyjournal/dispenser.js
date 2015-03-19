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

var Dispenser = React.createClass({
        getInitialState: function () {
            var data = DispenserStore.getDispenserData();
            return data;
            //PumpsStore.getDefaultPump()
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
            this.setState(DispenserStore.getDispenserData());
        },
        content: function () {
            /*
             <div className='col-xs-12 col-md-3'>
             <Pumpcounter title={Dict.previousCounter}
             onChange={this.handlePrevChange} value={this.state.prevCounter} />
             </div>
             <div className='col-xs-12 col-md-4'>
             <Pumpcounter  title={Dict.currentCounter}
             onChange={this.handleCurChange} value={this.state.curCounter}  />
             </div>

             <div className='top30  row'>
             <div className='col-xs-12'>
             <span  className="label label-default">{this.state.liters}</span>
             <span> {Dict.liters} </span>
             <span className="label label-info">{this.state.subtotal}</span>
             <span> {Dict.subTotal} </span>
             </div>
             </div>
             */
            var pumpsData = {
                items: [],
                title: Dict.pump,
                selected: 0
            };
            return <div className='input-lg'>
                <div className='row'>
                    <div className='col-xs-12 col-md-2'>
                        <Pumpselect data={pumpsData}  onChange={this.handlePumpChange}/>
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
                <Panel type={'primary'} header={Dict.dispensercounters} >
                            {validation}
                            {this.content()}
                </Panel>

                )
        },
        handleSave: function () {
            /*
             <Modal onSave={this.handleSave} modalLink={this.props.modalLink} title={Dict.dispenserModalTitle} saveCaption={'Ok'} closeCaption={'Cancel'} validation={this.state.validation.errorMsgs.length > 0}>

             </Modal>
             */
            DispenserActions.saveDispenser(this.state);
        },
        getPumpData: function () {
            return PumpsStore.getPump(this.state.pump.pid);
        },
        handlePumpChange: function (e) {
            var value = e.target.value;
            this.updateState(value, this.state.prevCounter, this.state.curCounter, this.validation);
        },
        validation: {prevCounter: '', currentCounter: '', errorMsgs: []},
        handlePrevChange: function (e) {
            this.validation = DispenserStore.validation({prevCounter: e.target.value, curCounter: this.state.curCounter});
            this.updateState(this.state.pump.pid, e.target.value, this.state.curCounter, this.validation);
        },
        handleCurChange: function (e) {
            this.validation = DispenserStore.validation({prevCounter: this.state.prevCounter, curCounter: e.target.value});
            this.updateState(this.state.pump.pid, this.state.prevCounter, e.target.value, this.validation);

        },
        updateState: function (pumpId, prevValue, currentValue, validation) {
            var subtotals = DispenserStore.calcSubtotals(pumpId, prevValue, currentValue);
            return this.setState({liters: parseFloat(subtotals.liters), subtotal: parseFloat(subtotals.subtotal), pump: PumpsStore.getPump(pumpId), prevCounter: prevValue, curCounter: currentValue, validation: validation});

        }
    })
    ;


module.exports = Dispenser;
