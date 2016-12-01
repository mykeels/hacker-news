﻿var week_days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months_of_year = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

Date.prototype.addMinutes = function (mins) {
    mins = mins || 1;
    var dat = new Date(this.valueOf());
    dat.setMinutes(dat.getMinutes() + mins);
    return dat;
}

Date.prototype.addHours = function (hrs) {
    hrs = hrs || 1;
    var dat = new Date(this.valueOf());
    dat.setHours(dat.getHours() + hrs);
    return dat;
}

Date.prototype.addDays = function (days) {
    days = days || 1;
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

Date.prototype.addMonth = function (months) {
    months = months || 1;
    var dat = new Date(this.valueOf());
    dat.setMonth(dat.getMonth() + months);
    return dat;
}

Date.prototype.addYear = function (years) {
    years = years || 1;
    var dat = new Date(this.valueOf());
    dat.setYear(dat.getYear() + years);
    return dat;
}

Date.prototype.getDayOfWeek = function () {
    var d = this;
    d = d || new Date();
    return week_days[d.getDay()];
}

Date.prototype.getMonthOfYear = function () {
    var d = this;
    d = d || new Date();
    return months_of_year[d.getMonth()];
}

Date.prototype.toShortDate = function (format) {
    var d = this;
    d = d || new Date();
    return Date.ChangeFormat(d, format);
}

Date.prototype.toMediumDate = function (dayofweek) {
    var d = this;
    d = d || new Date();
    var ret = "";
    if (dayofweek) ret += d.getDayOfWeek()._left(3) + ", ";
    ret += d.getDate() + " " + d.getMonthOfYear()._left(3) + ", " + d.getFullYear();
    return ret;
}

Date.prototype.toLongDate = function () {
    var d = this;
    d = d || new Date();
    return d.getDayOfWeek() + ", " + d.getMonthOfYear() + " " + d.getDate() + ", " + d.getFullYear();
}

Date.prototype.toTime = function (mode) {
    var date = this;
    mode = mode || 24;
    var hours = date.getHours();
    var mins = date.getMinutes();
    var secs = date.getSeconds();
    var suffix = "";
    if (hours > 12) {
        if (mode != 24) {
            hours = hours % 12;
            suffix = "PM";
        }
    }
    else {
        if (mode != 24) {
            suffix = "AM";
        }
    }
    return hours.pad(2) + ":" + mins.pad(2) + ":" + secs.pad(2) + " " + suffix;
}

Date.GetFormat = function () {
    var d = new Date(1950, 1, 21, 1, 1, 1, 1);
    var dstr = d.toLocaleDateString();
    if (dstr.search(/^\d\/\d{2}\/\d{4}/) == 0 || dstr.search(/^(\w+) \d{2} \d{4}/) == 0) {
        return "MM/DD/YYYY";
    }
    else if (dstr.search(/^\d\/\d{4}\/\d{2}/) == 0 || dstr.search(/^(\w+) \d{4} \d{2}/) == 0) {
        return "MM/YYYY/DD";
    }
    else if (dstr.search(/^\d{2}\/\d\/\d{4}/) == 0 || dstr.search(/^\d{2} (\w+) \d{4}/) == 0) {
        return "DD/MM/YYYY";
    }
    else if (dstr.search(/^\d{2}\/\d{4}\/\d/) == 0 || dstr.search(/^\d{2} \d{4} (\w+)/) == 0) {
        return "DD/YYYY/MM";
    }
    else if (dstr.search(/^\d{4}\/\d\/\d{2}/) == 0 || dstr.search(/^\d{4} (\w+) \d{2}/) == 0) {
        return "YYYY/MM/DD";
    }
    else if (dstr.search(/^\d{4}\/\d{2}\/\d/) == 0 || dstr.search(/^\d{4} \d{2} (\w+)/) == 0) {
        return "YYYY/DD/MM";
    }
    else {
        return "MM/DD/YYYY";
    }
}

Date.GetDate = function (short_date, format) {
    short_date = short_date || Date.ChangeFormat();
    format = format || "DD/MM/YYYY";
    var day = 0, month = 0, year = 0;
    var s = short_date.split("/");
    if (format == "DD/MM/YYYY") {
        day = s[0];
        month = s[1];
        year = s[2];
    }
    else if (format == "DD/YYYY/MM") {
        day = s[0];
        month = s[2];
        year = s[1];
    }
    else if (format == "MM/DD/YYYY") {
        day = s[1];
        month = s[0];
        year = s[2];
    }
    else if (format == "MM/YYYY/DD") {
        day = s[2];
        month = s[0];
        year = s[1];
    }
    else if (format == "YYYY/DD/MM") {
        day = s[1];
        month = s[2];
        year = s[0];
    }
    else if (format == "YYYY/MM/DD") {
        day = s[2];
        month = s[1];
        year = s[0];
    }
    else {
        day = s[0];
        month = s[1];
        year = s[2];
    }
    day = Number(day);
    month = Number(month);
    year = Number(year);
    //console.log(day);
    //console.log(month);
    //console.log(year);
    month -= 1;
    return new Date(year, month, day);
}

Date.ChangeFormat = function (d, format, splitter) {
    splitter = splitter || "/";
    d = d || new Date();
    format = format || Date.GetFormat(); //fix arguments

    var day = d.getDate().pad(2),
        month = (Number(d.getMonth()) + 1).pad(2),
        year = d.getFullYear().pad(4); //init

    if (format == "MM/DD/YYYY") {
        return month + splitter + day + splitter + year;
    }
    else if (format == "MM/YYYY/DD") {
        return month + splitter + year + splitter + day;
    }
    else if (format == "DD/MM/YYYY") {
        return day + splitter + month + splitter + year;
    }
    else if (format == "DD/YYYY/MM") {
        return day + splitter + year + splitter + month;
    }
    else if (format == "YYYY/MM/DD") {
        return year + splitter + month + splitter + day;
    }
    else if (format == "YYYY/DD/MM") {
        return year + splitter + day + splitter + month;
    }
    else {

    }
}

Date.prototype.ChangeFormat = function (format, splitter) {
    return Date.ChangeFormat(this, format, splitter);
}

Date.prototype.subtract = function (d) {
    var timespan = this - d;
    return timespan;
}

Date.prototype.subtractInHrs = function (d) {
    return Math.round(this.subtract(d) / (1000 * 60 * 60));
}

Date.prototype.subtractInDays = function (d) {
    return Math.round(this.subtractInHrs(d) / 24);
}

Date.prototype.subtractInWeeks = function (d) {
    return Math.round(this.subtractInDays(d) / 7);
}

Date.prototype.subtractInMonths = function (d) {
    return Math.round(this.subtractInDays(d) / 30);
}

Date.prototype.subtractInYears = function (d) {
    return Math.round(this.subtractInDays(d) / 365);
}

Date.prototype.yearsAgo = function () {
    var d = this;
    var diff = d.subtractInYears(new Date());
    if (diff > 0) { //in the future
        if (diff == 1) return "Next Year";
        return "In " + diff + " Years";
    }
    else { //in the past
        diff = Math.abs(diff);
        if (diff == 0) return null;
        if (diff == 1) return "Last Year";
        return diff + " Years Ago";
    }
}

Date.prototype.monthsAgo = function () {
    var d = this;
    var diff = d.subtractInMonths(new Date());
    if (diff > 0) { //in the future
        if (diff == 1) return "Next Month";
        return "In " + diff + " Months";
    }
    else { //in the past
        diff = Math.abs(diff);
        if (diff == 0) return null;
        if (diff == 1) return "Last Month";
        return diff + " Months Ago";
    }

}

Date.prototype.weeksAgo = function () {
    var d = this;
    var diff = d.subtractInWeeks(new Date());
    if (diff > 0) { //in the future
        if (diff == 1) return "Next Week";
        return "In " + diff + " Weeks";
    }
    else { //in the past
        diff = Math.abs(diff);
        if (diff == 0) return null;
        if (diff == 1) return "Last Week";
        return diff + " Weeks Ago";
    }

}

Date.prototype.daysAgo = function () {
    var d = this;
    var diff = d.subtractInDays(new Date());
    if (diff > 0) { //in the future
        if (diff == 1) return "Tomorrow";
        return "In " + diff + " Days";
    }
    else { //in the past
        diff = Math.abs(diff);
        if (diff == 0) return null;
        if (diff == 1) return "Yesterday";
        return diff + " Days Ago";
    }

}

Date.prototype.hoursAgo = function () {
    var d = this;
    var diff = d.subtractInHrs(new Date());
    if (diff > 0) { //in the future
        return "In " + diff + " Hour(s)";
    }
    else { //in the past
        diff = Math.abs(diff);
        if (diff == 0) return null;
        if (diff == 1) return "1 Hour ago";
        return diff + " Hours Ago";
    }
}

Date.prototype.ago = function () {
    if (this.yearsAgo()) return this.yearsAgo();
    if (this.monthsAgo()) return this.monthsAgo();
    if (this.weeksAgo()) return this.weeksAgo();
    if (this.daysAgo()) return this.daysAgo();
    if (this.hoursAgo()) return this.hoursAgo();
    return "Now";
}

String.prototype.ToDate = function (format) {
    var s = this;
    var d = new Date(s);
    if (format) return Date.GetDate(s, format);
    if (d != 'Invalid Date') return d;
    d = Date.GetDate(s, "DD/MM/YYYY");
    if (d != 'Invalid Date') return d;
    d = Date.GetDate(s, "DD/YYYY/MM");
    if (d != 'Invalid Date') return d;
    d = Date.GetDate(s, "MM/YYYY/DD");
    if (d != 'Invalid Date') return d;
    d = Date.GetDate(s, "MM/DD/YYYY");
    if (d != 'Invalid Date') return d;
    d = Date.GetDate(s, "YYYY/MM/DD");
    if (d != 'Invalid Date') return d;
    d = Date.GetDate(s, "YYYY/DD/MM");
    if (d != 'Invalid Date') return d;
    d = Date.GetDate(s);
    if (d != 'Invalid Date') return d;
    return 'Invalid Date';
}

Number.prototype.pad = function (count) {
    var num = this.valueOf();
    var ret = "";
    for (var i = 0; i < count - num.toString().length; i++) {
        ret += "0";
    }
    ret += num;
    return ret;
}