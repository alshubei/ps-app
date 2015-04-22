'use strict';

var React = require('react');


var Panel = React.createClass({

    render: function () {
        var header = '';
        if (this.props.header) {
            header = <div className="panel-heading">
                {this.props.header}
            </div>
            ;
        }
        return (
            <div className={"component component-panel vcenter panel panel-" + this.props.type + ' ' + this.props.additionalClasses}>
                {header}
                <div className="panel-body">
                            {this.props.children}
                </div>
            </div>
            )
    }
});


module.exports = Panel;
