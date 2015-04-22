'use strict';

var React = require('react');
var Dict = require('../common/dict.js');
var PumpsStore = require('../../stores/pumps-store.js');
var Modal = require('../../components/common/modal.js');
var Panel = require('../../components/common/panel.js');
var Pumpselect = require('../../components/dailyjournal/pumpselect.js');
var Pumpcounter = require('../../components/dailyjournal/pumpcounter.js');
var DispenserStore = require('../../stores/dispenser-store.js');
var DatePickerStore = require('../../stores/datepicker-store.js');
var DispenserActions = require('../../actions/dispenser-actions.js');
var DailyJournalActions = require('../../actions/dailyjournal-actions.js');
var DatePickerActions = require('../../actions/datepicker-actions.js');
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
            var subtotals = DispenserStore.calcSubtotals(this.state.pumpId, this.state.prevCounter, this.state.curCounter);
            return <div className={'component component-dispenser input-lg-2 ' + (this.state.editing == true ? 'editing' : '') } >
                <div className='Grid flex-start baseline'>
                    <Pumpselect title={Dict.tr('pump')}
                    selected={this.state.pumpId}
                    onChange={this.handlePumpChange}
                    className={'Grid-cell mr10'}
                    />

                    <Pumpcounter
                    title={Dict.tr('previousCounter')}
                    onChange={this.handlePrevChange}
                    placeHolder={Dict.tr('previousCounter')}
                    value={this.state.prevCounter}
                    className={'Grid-cell mr10'}
                    />

                    <Pumpcounter
                    title={Dict.tr('currentCounter')}
                    onChange={this.handleCurChange}
                    placeHolder={Dict.tr('currentCounter')}
                    value={this.state.curCounter}
                    className={'Grid-cell mr10'}
                    />



                </div>
                <div>
                    <div className='Grid flex-start top17'>
                        <span className={'Grid-cell mr10'}>
                            <span  className="label label-default">{subtotals.liters}</span>
                            <span> {Dict.tr('liters')} </span>
                        </span>
                        <span className={'Grid-cell mr10'}>
                            <span className="label label-info">{subtotals.subtotal}</span>
                            <span> {Dict.tr('subTotal')} </span>
                        </span>
                    </div>
                </div>
            </div>
        },
        render: function () {
            var validation = {errorMsgs: []};
            if (this.state.validation.errorMsgs.length > 0) {
                var errors = this.state.validation.errorMsgs.map(function (item, i) {
                    return <div key={i} className='text-danger'>{Dict.tr(item.msg)}</div>
                }.bind(this));
                validation = <Panel type={'danger'}>
                {errors}
                </Panel>;
            }
            return (
                <Modal
                show={this.props.show}
                title={Dict.tr('dispensercounters')}
                onSave={this.handleSave}
                saveCaption={Dict.tr('Ok')}
                closeCaption={Dict.tr('Cancel')}
                onCancel={this.handleCancel}
                validation={this.state.validation.errorMsgs.length > 0}
                >
                      {validation}
                      {this.content()}
                </Modal>

                )
        },
        validation: {prevCounter: '', currentCounter: '', errorMsgs: []},
        handleSave: function () {
            //I will need to chain/sync this using promises
            DispenserActions.addDispenser(this.state);
            DailyJournalActions.getJournalDays(DatePickerStore.getDate());
        },
        handleCancel: function () {
            //trigger cancel edit
            DispenserActions.cancelEditDispenser(this.state.dispenserIndex);
        },
        handlePumpChange: function (e) {
            var value = e.target.value;
            this.validation = DispenserStore.validation({prevCounter: this.state.prevCounter, curCounter: this.state.curCounter});
            this.updateState({pumpId: parseInt(value), validation: this.validation});
        },
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
            var subtotals = DispenserStore.calcSubtotals(this.state.pumpId, this.state.prevCounter, this.state.curCounter);
            this.setState(_.extend(
                this.state, {
                    liters: subtotals.liters,
                    subtotal: subtotals.subtotal}));

        }
    })
    ;


module.exports = Dispenser;
