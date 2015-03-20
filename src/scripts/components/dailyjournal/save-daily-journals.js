'use strict';

var React = require('react');
var _ = require('underscore');
var Dict = require('../common/dict.js');

var Savejournals = React.createClass({
    render: function () {
        return (<span>
                <button className={'btn btn-primary ' + (this.props.able ? ' ' : ' disabled')} onClick={this.props.onClick}>
                    {Dict.saveJournals}
                </button>
            </span>
            )

    }
});


module.exports = Savejournals;
