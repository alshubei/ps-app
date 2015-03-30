'use strict';

var React = require('react');
var logo = require('../../images/logo.png');
var Date = require('../../scripts/components/common/date-picker.js');

var header = React.createClass({
    render: function () {
        return (<div className={'component component-header navbar-fixed-top'} >
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header" >
                        <a className="navbar-brand navbar-left" href="#" >
                            <img alt="Brand" src={logo} />
                        </a>
                    </div>
                </div>
            </nav>
        </div>

            )
    }
});


module.exports = header;
