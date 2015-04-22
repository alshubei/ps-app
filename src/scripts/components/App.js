'use strict';

var React = require('react');
window.$ = window.jQuery = require('jquery');
//var bootstrap = require('bootstrap');

//var Login = require('../components/common/login.js');
//var LoginStore = require('../stores/login-store.js');

var Dailyjournal = require('../../scripts/components/dailyjournal/dailyjournal.js');
var Journalresults = require('../../scripts/components/dailyjournal/journalresults.js');
var DailyJournalStore = require('../stores/dailyjournal-store.js');
var LangSwitcherStore = require('../stores/langswitcher-store.js');
var DatePickerActions = require('../actions/datepicker-actions.js');
var DailyJournalActions = require('../actions/dailyjournal-actions.js');
var Header = require('../../scripts/components/header.js');
var Error = require('../../scripts/components/error.js');
var Footer = require('../../scripts/components/footer.js');
var Panel = require('../../scripts/components/common/panel.js');
var Debug = require('../../scripts/components/common/debug.js');
var Dict = require('../components/common/dict.js');
var DatePicker = require('../../scripts/components/common/date-picker.js');
var Langswitcher = require('../../scripts/components/common/langswitcher.js');
var Utils = require('../../scripts/components/common/utils.js');
var DatePickerStore = require('../stores/datepicker-store.js');
var Save = require('../components/dailyjournal/save-daily-journals.js');
var Journalscalendar = require('../components/dailyjournal/journals-calendar.js');
var Modal = require('../components/common/modal.js');
var Message = require('../components/common/message.js');
var Loader = require('react-loader');
var Login = require('../components/login.js');
var _ = require('underscore');
var img_pump = require('../../images/pump.png');
var Dispenser = require('../components/dailyjournal/dispenser.js');
var Journal = require('../components/dailyjournal/journal.js');
var PumpsActions = require('../actions/pumps-actions.js');
var DispenserActions = require('../actions/dispenser-actions.js');

var App = React.createClass({
    getInitialState: function () {
        return DailyJournalStore.getData();
    },
    componentDidMount: function () {
        this.unsubscribe = DailyJournalStore.listen(this.onChange);
        if (this.isMounted()) {
            if (window.location.host === 'localhost:8000') {
                DailyJournalActions.setUser({userId: -1, userName: 'demo', userEmail: 'demo'});
                return;
            }
            jQuery.get('login/login_api.php?key=user', function (result) {
                var resultJson = JSON.parse(result);
                if (resultJson.error) {
                    DailyJournalActions.setUser({userId: null});
                } else {
                    var user = {userId: parseInt(resultJson.userId), userName: resultJson.userName, userEmail: resultJson.userEmail};
                    DailyJournalActions.setUser(user);
                    PumpsActions.getPumps();
                    //window.location.replace("login/login.php");
                }
            });
        }
    },
    componentWillUnmount: function () {
        this.unsubscribe();
    },
    render: function () {
        var journalsData = DailyJournalStore.makeJournals();
        var journals = journalsData.map(function (item, i) {
            return <Journal key={i} data={item} className='Grid-cell  mr20'/>;
        });
        var messageJournalsExist = Dict.tr("no_journals_this_date") + ' '
            + DatePickerStore.getDateFormatted() + ' '
            + Dict.tr("and") + ' ' + Dict.tr("this_user") + ' '
            + DailyJournalStore.getUser().userName;
        if (DailyJournalStore.shouldClickView()) {
            messageJournalsExist = Dict.tr("click_view_for_journals_this_date") + ' ' + DatePickerStore.getDateFormatted();
        }
        var DailyJournal = <div>
            <Dispenser show={this.state.showDispenserModal}/>
            <div className='Grid flex-start top10  '>
                    {(DailyJournalStore.shouldClickView() ? <Message message={messageJournalsExist}/> : (journals.length > 0 ? journals : <Message message={messageJournalsExist}/>))}
            </div>
        </div>;

        var appContent = '';
        var _content = '';
        if (DailyJournalStore.getErrors().length > 0) {
            _content = <Error />;
        } else {
            _content = DailyJournal;
        }
        if (DailyJournalStore.getUser().userId == null) {
            appContent = <Login />;
        } else {
            appContent =
                <div className={'container-fluid Grid flex-start content-container stretch'}>
                    <div className='' dir={LangSwitcherStore.getDefaultDir()}>
                        <Langswitcher />
                    </div>
                    <div className='home-panel control-panel container-fluid panel panel-default modal-content Grid-cell' dir={LangSwitcherStore.getDir()}>
                        <Panel type={'default'}  >
                            <div className='Grid flex-start'>
                                <div className='Grid-cell mr5'>
                                    <DatePicker />
                                </div>
                                <div className='Grid-cell mr5'>
                                    <button className='btn btn-primary' onClick={this.viewJournals}>{Dict.tr('view')}</button>
                                </div>
                            </div>
                            <hr className='mtb10'/>
                            <div className='Grid flex-start'>
                                <div className='Grid-cell mr5'>
                                    <button className="addDispenserIcon btn btn-primary"  onClick={this.handleOpenDispenserModal}>
                                        <h3 className="plus">{Dict.tr('plus')}</h3>
                                        <img src={img_pump}/>
                                    </button>
                                </div>
                                <div className='Grid-cell mr5'>
                                    <Save />
                                </div>
                            </div>
                            <hr className='mtb10'/>
                            <Journalresults />
                            <hr className='mtb10'/>
                            <label className='cp nomargin'>
                                <input type='checkbox' checked={this.state.filterByAllUsers} onChange={this.handleFilterByAllUsers}/>
                                            {' ' + Dict.tr('all_users_tody_at') + ' (' + DatePickerStore.getDateFormatted() + ') '}
                            </label>
                            <hr className='mtb10'/>
                            <Journalscalendar />
                        </Panel>
                    </div >
                    <div className = 'home-panel content-panel container modal-content Grid-cell' dir = {LangSwitcherStore.getDir()}>
                        <Panel type={'default'}  >
                            {_content}
                        </Panel>
                    </div >
                </div >;
        }
        return (
            <div className={'container-fluid  '} dir={LangSwitcherStore.getDir()}>
                <Header />
                 {appContent}
                <Footer  subTitle={Dict.tr('footerSubTitle')}/>
            </div>
            )
    },
    viewJournals: function () {
        DailyJournalActions.viewJournals({
            date: DatePickerStore.getDate(),
            user: (this.state.filterByAllUsers ? null : this.state.user)});
    },
    onChange: function () {
        this.setState(DailyJournalStore.getData());
    },
    handleOpenDispenserModal: function () {
        DispenserActions.showDispenserModal();
    },
    handleFilterByAllUsers: function (e) {
        this.setState(_.extend(this.state, {filterByAllUsers: e.target.checked}));
        this.viewJournals();
        DailyJournalActions.getJournalDays(DatePickerStore.getDate());
    }
});

module.exports = App;

React.render(
    <App />
    , document.body);


