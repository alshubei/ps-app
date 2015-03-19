'use strict';

var React = require('react');
var Dailyjournal = require('../../scripts/components/dailyjournal/dailyjournal.js');
var Pageheader = require('../../scripts/components/header.js');
var Pagefooter = require('../../scripts/components/footer.js');
var Panel = require('../../scripts/components/common/panel.js');
var Debug = require('../../scripts/components/common/debug.js');
var Dict = require('../../scripts/components/common/dict.js');
var JDate = require('../../scripts/components/common/jdate.js');
var _ = require('underscore');




var App = React.createClass({
    render: function () {
        return (
            <div className='container' >
                <Pageheader title={Dict.headerTitle} subTitle={Dict.headerSubTitle} />
                <JDate />
                <Panel type={'primary'} header={Dict.journal}>
                   <Dailyjournal />
                </Panel>
                <Pagefooter title={Dict.footerTitle} subTitle={Dict.footerSubTitle}/>
            </div>
            );
    }
});


React.render(
    <App />
    , document.body); // jshint ignore:line

module.exports = App;
