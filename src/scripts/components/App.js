'use strict';

var React = require('react');
var Dispenser = require('../../scripts/components/dailyjournal/dispenser.js');
var l = require('../../scripts/loader.js');

var App = React.createClass({
    render: function () {
        return (
            <div className='container' id="container">
                <l.Pageheader />
                <l.Panel title={l.dict.journal}>
                {[
                    <Dispenser />,
                    <l.Dailyjournal />

                ]}
                </l.Panel>

                <l.Pagefooter />
            </div>
            );
    }
});
React.render(<App />, document.body); // jshint ignore:line

module.exports = App;
