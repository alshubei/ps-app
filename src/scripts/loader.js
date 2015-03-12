module.exports = {

    dict: require('../scripts/components/common/dict.js'),
    Pageheader: require('../scripts/components/header.js'),
    Pagefooter: require('../scripts/components/footer.js'),
    Modal: require('../scripts/components/common/modal.js'),
    Panel: require('../scripts/components/common/panel.js'),

    //Components
    Dispenser: require('../scripts/components/dailyjournal/dispenser.js'),
    Pumpselect: require('../scripts/components/dailyjournal/pumpselect.js'),
    Pumpcounter: require('../scripts/components/dailyjournal/pumpcounter.js'),
    Dailyjournal: require('../scripts/components/dailyjournal/Dailyjournal.js'),

    //Stores
    Dispenserstore: require('../scripts/stores/dispenser-store.js'),
    Dailyjournalstore: require('../scripts/stores/dailyjournal-store.js'),
    Pumpsstore: require('../scripts/stores/pumps-store.js')




};