/** @jsx React.DOM */

var React = require('react');
var Utils = require('../../components/common/utils.js');
var DatePickerStore = require('../../stores/datepicker-store.js');
var DatePickerActions = require('../../actions/datepicker-actions.js');
var Datepicker =
    React.createClass({
        getInitialState: function () {
            return {date: Utils.formatDate(Date.now())};
        },
        componentDidMount: function () {
            this.unsubscribe = DatePickerStore.listen(this._onChange);
        },
        componentWillUnmount: function () {
          this.unsubscribe();
        },
        render: function () {
            /*
             <span className='lead bg-info'>
             Date: {Utils.formatDate(DailyJournalStore.getDate())}
             </span>
             */
            return (
                <span>
                    <label>Date:
                        <input ref="dateInput" type="text" value={this.state.date} onChange={this.handleChangeDate}/>
                    </label>
                    <button onClick={this.handleTodayClick}>Today</button>
                    <button onClick={this.handleChangeDate} >Calendar</button>
                </span>

                )
        },
        handleTodayClick: function () {
            DatePickerActions.changeDate(Utils.formatDate(Date.now()));
        },
        handleChangeDate: function (e) {
            //validate that it is valid date YYYY-(/)MM-DD
            DatePickerActions.changeDate(e.target.value);
        },
        _onChange: function () {
            this.setState(DatePickerStore.getState());
        }
    });

module.exports = Datepicker;