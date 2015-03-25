'use strict';

var React = require('react');

var header = React.createClass({
    render: function () {
        var content =
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        {this.props.children}
                    </div>
                </div>
            </nav>
        return (
            <div>
                {content}
            </div>

            );
    }
});


module.exports = header;
