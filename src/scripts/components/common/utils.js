
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
    },
    getMonth: function (date) {
        return (new Date(date)).getMonth() + 1;
    },
    getDateFrom: function (dateIn) {
        var date = new Date(dateIn);
        var month = parseInt(date.getMonth()) + 1;
        if (month >= 1 && month <= 9 ) {
            month = ('0' + month.toString());
        }
        return date.getFullYear() + '-' + month + '-' + '01';
    },
    getDateTo: function (dateIn) {
        var date = new Date(dateIn);
        var month = parseInt(date.getMonth()) + 1;
        if (month >= 1 && month <= 9 ) {
            month = ('0' + month.toString());
        }
        return date.getFullYear() + '-' + month + '-' + '31';
    }
};