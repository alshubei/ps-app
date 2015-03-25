
var _ = require('underscore');

module.exports = {
    formatDate: function (dateIn) {
        var date = new Date(dateIn);
        var month = parseInt(date.getMonth()) + 1;
        var day = parseInt(date.getDate());
        if (month >= 1 && month <= 9 ) {
            month = ('0' + month.toString());
        }
        if (day >= 1 && day <= 9 ) {
            day = ('0' + day.toString());
        }
        return date.getFullYear() + '-' + month + '-' + day;
    }
};