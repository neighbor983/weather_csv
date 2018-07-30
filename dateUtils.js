const dateUtils = {
    addDays: function(beginDate, numberOfDays) {
        let resultDate = new Date(
            beginDate.getFullYear(),
            beginDate.getMonth(),
            beginDate.getDate() + numberOfDays,
            beginDate.getHours(),
            beginDate.getMinutes(),
            beginDate.getSeconds()
        );
        return resultDate;
    },
    convertTimeStamp: function(dateTimeStamp) {
        let timeStamp = dateTimeStamp.getFullYear() + '-' +
            convertMonth(dateTimeStamp.getMonth()) + '-' +
            convertDay(dateTimeStamp.getDate()) +
            'T00:00:00';

        return timeStamp;
    },
    humanReadableDate: function(dateMilseconds){
        return new Date(dateMilseconds * 1000).toDateString();
    }
};

module.exports = dateUtils;

function convertDay(dayValue) {
    if (dayValue < 10) {
        return '0' + dayValue;
    }
    else {
        return dayValue;
    }
}

function convertMonth(monthValue) {
    let newMonth = monthValue + 1;
    if (newMonth < 10) {
        return '0' + newMonth;
    }
    else {
        return newMonth;
    }
}
