var Reflux = require('reflux');

var JournalStore = Reflux.createStore({
    init: function () {

    },
    calculateJournal: function (journal) {
        console.log(journal);
        console.log(journal.dispensers);

        return {liters: journal.dispensers[0].liters,
            subtotal: journal.dispensers[0].subtotal,
            pump: journal.dispensers[0].pump,
            prevCounter: journal.dispensers[0].prevCounter,
            curCounter: journal.dispensers[0].curCounter };
    }
});


module.exports = JournalStore;