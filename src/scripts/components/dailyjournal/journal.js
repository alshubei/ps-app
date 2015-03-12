'use strict';

var React = require('react');


var Journal = React.createClass({
    render: function () {
        var data = this.props.data;
        return (
            <div className='col-xs-6 col-md-3'>
                <a href='#' className='thumbnail'>
                    <div className=''>
                        <h3>{data.fuel}</h3>
                        <div>Prev: <span className="label label-default">{data.counters.prevCtr}</span></div>
                        <div>Cur: <span className="label label-default">{data.counters.curCtr}</span></div>
                        <div>Due Liters: <span className="label label-default">{data.counters.curCtr - data.counters.prevCtr}</span></div>
                        <div>Due Amount: <span className="label label-info">{data.dueAmount}</span></div>

                    </div>
                </a>
            </div>

            )
    }
});


module.exports = Journal;
