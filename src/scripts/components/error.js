'use strict';

var React = require('react');
var DailyJournalStore = require('../stores/dailyjournal-store.js');
var LangSwitcherStore = require('../stores/langswitcher-store.js');
var Dict = require('../components/common/dict.js');


var Error = React.createClass({
    render: function () {
        var lines = DailyJournalStore.getErrors().map(function (item, i) {
            return <p className='error' key={i}>{Dict.tr(item)}</p>;
        }.bind(this))
        return (<div className={'component component-error'} >
            {lines}
        </div>

            )

    }
});


module.exports = Error;
