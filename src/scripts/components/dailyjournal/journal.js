'use strict';

var React = require('react');
var Modal = require('../../components/common/modal.js');
var Journalstore = require('../../stores/journalstore.js');

var Journal = React.createClass({
    render: function () {
        var data = Journalstore.calculateJournal(this.props.data);
        return (
            <div className='col-xs-6 col-md-3' data-toggle="modal" data-target=".bs-example-modal-lg">
                <a href='#' className='thumbnail'>
                    <div className=''>
                        <h3>{data.pump.fuel}</h3>
                        <div>Prev:
                            <span className="label label-default">{data.prevCounter}</span>
                        </div>
                        <div>Cur:
                            <span className="label label-default">{data.curCounter}</span>
                        </div>
                        <div>Due Liters:
                            <span className="label label-default">{data.liters}</span>
                        </div>
                        <div>Due Amount:
                            <span className="label label-info">{data.subtotal}</span>
                        </div>

                    </div>
                </a>
            </div>

            )
    }
});


module.exports = Journal;
