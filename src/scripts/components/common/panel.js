'use strict';

var React = require('react');


var Panel = React.createClass({
    render: function () {
        return (
            <div className='row'>
                <div className='col-xs-12 col-md-12 col-lg-12'>
                    <div className="panel panel-primary">
                        <div className="panel-heading">{this.props.title}</div>
                        <div className="panel-body">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
            )
    }
});


module.exports = Panel;
