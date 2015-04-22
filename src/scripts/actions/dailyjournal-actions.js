var Reflux = require('reflux');
var Actions = Reflux.createActions([
    "removeJournal", //based on fuel type. i.e. petrol, diesel, etc
    "saveJournals",
    "getJournals",
    "getJournalDays",
    "viewJournals",
    "setUser",
    "error"

]);

module.exports = Actions;