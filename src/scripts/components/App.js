'use strict';

var React = require('react');
var Dispenser = require('../../scripts/components/dailyjournal/dispenser.js');
var Modal = require('../../scripts/components/common/modal.js');
var l = require('../../scripts/loader.js');

var App = React.createClass({
    render: function () {

        return (
            <div className='container' >
                <l.Pageheader />
                <l.Panel title={l.dict.journal}>
                {[
                    <button className="btn btn-primary"  data-toggle="modal" data-target=".add-dispenser-modal">
                    +
                    </button>,
                    <Dispenser modalLink={'add-dispenser-modal'}/>,
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
