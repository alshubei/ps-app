var Reflux = require('reflux');
var Actions = Reflux.createActions([
    "removeJournal", //based on fuel type. i.e. petrol, diesel, etc
    "saveJournalsInServer",
    "fetchJournalsFromServer"

]);

module.exports = Actions;