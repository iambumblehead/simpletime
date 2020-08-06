"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Filename: simpletime.js  
// parts of this based on work found in comp.lang.javascript faq
//
// international and local date formats are specified using proper unicode 
// forms http://cldr.unicode.org/translation/date-time
var isNum = function isNum(n) {
  return !Number.isNaN(Number.parseFloat(n));
};

var dateRegex = {
  iso: /^\s*(\d{4})[-/\.](\d\d)[-/\.](\d\d)\s*$/,
  usEndian: /^\s*(\d\d)[-/\.](\d\d)[-/\.](\d{4})\s*$/
};
var defFormatRegex = {
  iso: /yyyy[/.-]mm[/.-]dd/gi,
  usEndian: /mm[/.-]dd[/.-]yyyy/gi
};
var localeMethods = {
  getDateSymbolsMonthAbbrev: function getDateSymbolsMonthAbbrev() {
    return {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec"
    };
  },
  getDateSymbolsMonthWide: function getDateSymbolsMonthWide() {
    return {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December"
    };
  },
  getDateSymbolsMonthNarrow: function getDateSymbolsMonthNarrow() {
    return {
      1: "J",
      2: "F",
      3: "M",
      4: "A",
      5: "M",
      6: "J",
      7: "J",
      8: "A",
      9: "S",
      10: "O",
      11: "N",
      12: "D"
    };
  },
  getDateSymbolsDayAbbrev: function getDateSymbolsDayAbbrev() {
    return ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  },
  getDateSymbolsDayWide: function getDateSymbolsDayWide() {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  }
}; // abbreviated month name, ex. `Jan` or `Dec`

var localeMethods_getNumericMonthNameAbbrev = function localeMethods_getNumericMonthNameAbbrev(monthNum) {
  return localeMethods.getDateSymbolsMonthAbbrev()[monthNum];
}; // wide month name, ex. `January` or `December`


var localeMethods_getNumericMonthNameWide = function localeMethods_getNumericMonthNameWide(monthNum) {
  return localeMethods.getDateSymbolsMonthWide()[monthNum];
}; // abbreviated day name, ex. `sun` or `thu`      


var localeMethods_getNumericDayNameAbbrev = function localeMethods_getNumericDayNameAbbrev(dayNum) {
  return localeMethods.getDateSymbolsDayAbbrev()[dayNum];
}; // wide day name, ex. `Sunday` or `Thursday`      


var localeMethods_getNumericDayNameWide = function localeMethods_getNumericDayNameWide(dayNum) {
  return localeMethods.getDateSymbolsDayWide()[dayNum];
};

var isDateObj = function isDateObj(dateObj) {
  return dateObj instanceof Date && !Number.isNaN(dateObj);
}; // ex. 2013, 0008, 0488


var getDateYStr = function getDateYStr(d) {
  return ("000" + d.getFullYear()).slice(-4);
}; // ex. 12, 10, 07, 04


var getDateMStr = function getDateMStr(d) {
  return ("0" + (d.getMonth() + 1)).slice(-2);
}; // ex. 12, 10, 07, 04, 30


var getDateDStr = function getDateDStr(d) {
  return ("0" + d.getDate()).slice(-2);
};

var getDatehhStr = function getDatehhStr(d) {
  return ("0" + d.getHours()).slice(-2);
};

var getDatemmStr = function getDatemmStr(d) {
  return ("0" + d.getMinutes()).slice(-2);
};

var getDatessStr = function getDatessStr(d) {
  return ("0" + d.getSeconds()).slice(-2);
}; // ex. 2013, 8, 488


var getDateYNum = function getDateYNum(d) {
  return d.getFullYear();
}; // ex. 12, 10, 7, 4


var getDateMNum = function getDateMNum(d) {
  return d.getMonth() + 1;
}; // ex. 12, 10, 7, 4, 30


var getDateDNum = function getDateDNum(d) {
  return d.getDate();
};

var getDateYMDStrArr = function getDateYMDStrArr(d) {
  return isDateObj(d) ? [getDateYStr(d), getDateMStr(d), getDateDStr(d) //that.getDatehhStr(d),
  //that.getDatemmStr(d),
  //that.getDatessStr(d)
  ] : [];
}; // return the date as array of numbers
// ex. [2013, 5, 5]


var getDateYMDNumArr = function getDateYMDNumArr(d) {
  return isDateObj(d) ? [getDateYNum(d), getDateMNum(d), getDateDNum(d)] : [];
}; // return a new date object that has time of the given dateObj, defined to 
// the first second of the day.


var getTimeBgnDay = function getTimeBgnDay(dateObj) {
  var d = new Date(dateObj || null);
  d.setMilliseconds(0);
  d.setSeconds(0);
  d.setMinutes(0);
  d.setHours(0);
  return d;
}; // return a new date object that has time of the given dateObj, defined to 
// the last second of the day.


var getTimeEndDay = function getTimeEndDay(dateObj) {
  var d = new Date(dateObj || null);
  d.setMilliseconds(998);
  d.setSeconds(59);
  d.setMinutes(59);
  d.setHours(23);
  return d;
}; // return number days that occur in the given month for the given year


var getDaysInMonth = function getDaysInMonth(yNum, mNum) {
  return new Date(yNum, mNum, 0).getDate();
}; // if M is greater than 12, a value of 12 (representing M) is returned
// if M is less than 12, a value of 0 (representing M) is returned


var getMFittedYMDNumArr = function getMFittedYMDNumArr(YMDNumArr) {
  var _YMDNumArr = _slicedToArray(YMDNumArr, 3),
      y = _YMDNumArr[0],
      m = _YMDNumArr[1],
      d = _YMDNumArr[2];

  if (m <= 0) {
    m = 1;
  } else if (m > 12) {
    m = 12;
  }

  return [y, m, d];
}; // this method will return a YMDNumArr with a value of 'D' fitted to fall
// in the range of the date created by Y and M.
// 
// for example, if M has 28 days and D is 30, 28 is returned,


var getDFittedYMDNumArr = function getDFittedYMDNumArr(YMDNumArr) {
  var _YMDNumArr2 = _slicedToArray(YMDNumArr, 3),
      y = _YMDNumArr2[0],
      m = _YMDNumArr2[1],
      d = _YMDNumArr2[2],
      ymDays = getDaysInMonth(y, m);

  if (d <= 0) {
    d = 1;
  } else if (d > ymDays) {
    d = ymDays;
  }

  return [y, m, d];
}; // return date object from string OR number formatted ymdArr


var getYMDArrDate = function getYMDArrDate() {
  var YMDArr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var _YMDArr = _slicedToArray(YMDArr, 7),
      _YMDArr$ = _YMDArr[0],
      y = _YMDArr$ === void 0 ? 0 : _YMDArr$,
      _YMDArr$2 = _YMDArr[1],
      m = _YMDArr$2 === void 0 ? 0 : _YMDArr$2,
      _YMDArr$3 = _YMDArr[2],
      d = _YMDArr$3 === void 0 ? 0 : _YMDArr$3,
      _YMDArr$4 = _YMDArr[3],
      hh = _YMDArr$4 === void 0 ? 0 : _YMDArr$4,
      _YMDArr$5 = _YMDArr[4],
      mm = _YMDArr$5 === void 0 ? 0 : _YMDArr$5,
      _YMDArr$6 = _YMDArr[5],
      ss = _YMDArr$6 === void 0 ? 0 : _YMDArr$6,
      _YMDArr$7 = _YMDArr[6],
      ms = _YMDArr$7 === void 0 ? 0 : _YMDArr$7,
      date = null;

  if (isNum(y) && isNum(m) && isNum(d)) {
    date = new Date();
    date.setFullYear(+y, +m - 1, +d);
    date.setHours(isNum(hh) ? +hh : 0, isNum(mm) ? +mm : 0, isNum(ss) ? +ss : 0, isNum(ms) ? +ms : 0);
  }

  return date;
}; // return a date, with given number of minutes added
// number may be negative so that the returned date will be in the past
// 
// optNum: +2 goes forward two. -6 go back 6.


var getMinFromDate = function getMinFromDate(dateObj, optNum) {
  return new Date(dateObj.getTime() + optNum * 60 * 1000);
};

var getMinFromTodayDate = function getMinFromTodayDate(optNum) {
  return getMinFromDate(new Date(), optNum);
}; // return a date, with given number of hours added
// number may be negative so that the returned date will be in the past
// 
// optNum: +2 goes forward two. -6 go back 6.


var getSecFromDate = function getSecFromDate(dateObj, optNum) {
  return new Date(dateObj.getTime() + optNum * 1000);
};

var getSecFromTodayDate = function getSecFromTodayDate(optNum) {
  return getMinFromDate(new Date(), optNum);
}; // return a date, with given number of hours added
// number may be negative so that the returned date will be in the past
// 
// optNum: +2 goes forward two. -6 go back 6.


var getHourFromDate = function getHourFromDate(dateObj, optNum) {
  return new Date(dateObj.getTime() + optNum * 60 * 60 * 1000);
};

var getHourFromTodayDate = function getHourFromTodayDate(optNum) {
  return getMinFromDate(new Date(), optNum);
}; // return a date, with given number of days added
// number may be negative so that the returned date will be in the past
// 
// optNum: +2 goes forward two. -6 go back 6.


var getDayFromDate = function getDayFromDate(dateObj, optNum) {
  var num = 0,
      finDate = null,
      YMDNumArr = getDateYMDNumArr(dateObj || new Date());

  if (YMDNumArr) {
    if (typeof optNum === 'string') {
      if (isNum(optNum)) {
        num = Number.parseInt(+optNum, 10);
      }
    } else if (typeof optNum === 'number') {
      num = +optNum;
    }

    if (num) YMDNumArr[2] += num;
    finDate = getYMDArrDate(YMDNumArr);
  }

  return finDate;
};

var getDayFromTodayDate = function getDayFromTodayDate(optNum) {
  return getDayFromDate(new Date(), optNum);
}; // return a date, with given number of months added
// number may be negative so that the returned date will be in the past
// 
// optNum: +2 goes forward two. -6 go back 6.
//
// if original date is on day 30 and new month is only 28 days long, the 
// returned month will have its day 'fitted' so that the new date object
// will be defined to the latest day of the month


var getMonthFromDate = function getMonthFromDate(dateObj, optNum) {
  var num = 0,
      finDate = null,
      diff,
      YMDNumArr = getDateYMDNumArr(dateObj || new Date());

  if (YMDNumArr) {
    if (typeof optNum === 'string') {
      if (isNum(optNum)) {
        num = Number.parseInt(+optNum, 10);
      }
    } else if (typeof optNum === 'number') {
      num = +optNum;
    }

    if (num) {
      YMDNumArr[1] += num;
      YMDNumArr = getDFittedYMDNumArr(YMDNumArr);
    }

    finDate = getYMDArrDate(YMDNumArr);
  }

  return finDate;
};

var getMonthFromTodayDate = function getMonthFromTodayDate(opt) {
  return getDayFromDate(new Date(), opt);
}; // return a date, with given number of years added
// number may be negative so that the returned date will be in the past
// 
// optNum: +2 goes forward two. -6 go back 6.


var getYearFromDate = function getYearFromDate(dateObj, optNum) {
  var YMDArr = getDateYMDNumArr(dateObj || new Date());

  if (isNum(optNum)) {
    YMDArr[0] += +optNum;
  }

  return getYMDArrDate(YMDArr);
};

var getYearFromTodayDate = function getYearFromTodayDate(optNum) {
  return getYearFromDate(new Date(), optNum);
}; // return a new date object defined from the given date object
// returned date is defined to the first day of the month
// 
// if optNum is provided, optNum days are added to date object


var getFirstOfMonth = function getFirstOfMonth(dateObj, optNum) {
  var YMDNumArr = getDateYMDNumArr(new Date(dateObj || null)),
      finDate;
  YMDNumArr[2] = 1;

  if (isNum(optNum)) {
    YMDNumArr[2] += +optNum;
  }

  finDate = getYMDArrDate(YMDNumArr);
  finDate = getTimeBgnDay(finDate);
  return finDate;
}; // return a new date object defined from the given date object
// returned date is defined to the last day of the month


var getLastOfMonth = function getLastOfMonth(dateObj) {
  return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
}; // return true if the first date occurs `before` the second date


var isDateBeforeDate = function isDateBeforeDate(dateObj, beforeDateObj) {
  var now = beforeDateObj,
      dateObj1 = dateObj,
      year,
      yearNow,
      month,
      monthNow,
      date,
      dateNow;
  year = dateObj1.getFullYear();
  yearNow = now.getFullYear();

  if (year <= yearNow) {
    month = dateObj1.getMonth();
    monthNow = now.getMonth();

    if (year <= yearNow && month <= monthNow) {
      date = dateObj1.getDate();
      dateNow = now.getDate();

      if (year <= yearNow && month <= monthNow && date <= dateNow) {
        return true;
      }
    }
  }

  return false;
}; // return true if the date occurs `before` today's date


var isDateBeforeToday = function isDateBeforeToday(dateObj) {
  return isDateBeforeDate(dateObj, new Date());
}; // return a new date object that has time of the given dateObj, defined to 
// the first second of the first day of the month.


var getTimeBgnMonth = function getTimeBgnMonth(dateObj) {
  var dateYMDArr = getDateYMDStrArr(dateObj),
      finDateObj;
  dateYMDArr[2] = 1;
  finDateObj = getYMDArrDate(dateYMDArr);
  finDateObj = getTimeBgnDay(finDateObj);
  return finDateObj;
}; // return a new date object that has time of the given dateObj, defined to 
// the last second of the last day of the month.


var getTimeEndMonth = function getTimeEndMonth(dateObj) {
  var dateYMDArr = getMonthFromDate(dateObj, 1),
      finDateObj;
  dateYMDArr = getDateYMDStrArr(dateYMDArr);
  dateYMDArr[2] = 0; // end of month

  finDateObj = getYMDArrDate(dateYMDArr);
  finDateObj = getTimeEndDay(finDateObj);
  return finDateObj;
}; // ISO 8601
// accept time as: yyyy.mm.dd, yyyy/mm/dd, yyyy-mm-dd
//
// return a date object from a simple ISO formatted date


var parseISO8601 = function parseISO8601(dateStringInRange) {
  var date = new Date(NaN),
      month,
      parts = dateStringInRange.match(dateRegex.iso);
  if (!parts) return null;
  month = +parts[2];
  date.setFullYear(parts[1], month - 1, parts[3]);
  if (month != date.getMonth() + 1) date = date.getTime(NaN);
  return date && isNum(date.getTime()) ? date : null;
};

var isDefISOFormat = function isDefISOFormat(format) {
  return defFormatRegex.iso.test(format);
}; // middle endian
// accept time as: mm.dd.yyyy, mm/dd/yyyy, mm-dd-yyyy
//
// return a date object from a simple US endian formatted date


var parseUSEndian = function parseUSEndian(dateStringInRange) {
  var date = new Date(NaN),
      month,
      parts = dateStringInRange.match(dateRegex.usEndian);
  if (!parts) return null;
  month = +parts[1];
  date.setFullYear(parts[3], month - 1, parts[2]);
  if (month != date.getMonth() + 1) date = date.getTime(NaN);
  return date && isNum(date.getTime()) ? date : null;
};

var isDefUSEndianFormat = function isDefUSEndianFormat(format) {
  return defFormatRegex.usEndian.test(format);
}; // return a simple ISO formatted date from a date object
// returns a date object in iso standard: yyyy/mm/dd


var getDateAsISO = function getDateAsISO(dateInRange) {
  var year = dateInRange.getFullYear(),
      isInRange = year >= 0 && year <= 9999,
      yyyy,
      mm,
      dd;

  if (!isInRange) {
    throw RangeError("formatDate: year must be 0000-9999");
  }

  yyyy = ("000" + year).slice(-4);
  mm = ("0" + (dateInRange.getMonth() + 1)).slice(-2);
  dd = ("0" + dateInRange.getDate()).slice(-2);
  return yyyy + "/" + mm + "/" + dd;
};

var getEpochDateAsISO = function getEpochDateAsISO(strEpoch) {
  var num,
      date = null;

  if (strEpoch && isNum(strEpoch)) {
    num = Number.parseInt(strEpoch, 10);
    date = new Date(num);
    if (date) date = getDateAsISO(date);
  }

  return date;
}; // return a simple US endian formatted date from a date object
// returns a date object in iso standard: mm-dd-yyyy


var getDateAsUSEndian = function getDateAsUSEndian(dateInRange) {
  var year = dateInRange.getFullYear(),
      isInRange = year >= 0 && year <= 9999,
      yyyy,
      mm,
      dd;
  if (!isInRange) throw RangeError("formatDate: year must be 0000-9999");
  yyyy = ("000" + year).slice(-4);
  mm = ("0" + (dateInRange.getMonth() + 1)).slice(-2);
  dd = ("0" + dateInRange.getDate()).slice(-2);
  return mm + "/" + dd + '/' + yyyy;
}; // accepts a string or int epoch


var getEpochDateAsUSEndian = function getEpochDateAsUSEndian(strEpoch) {
  var num, date;

  if (strEpoch && isNum(strEpoch)) {
    num = Number.parseInt(strEpoch, 10);
    date = new Date(num);
    if (date) return getDateAsUSEndian(date);
  }

  return null;
}; // return monthly array of dates within the range of bgnDate and endDate. An
// optional filter function fn may be provided as the third parameter.
// 
// bgnDate will be the first element in the returned array


var yieldRangeMonthly = function yieldRangeMonthly(bgnDate, endDate, filter) {
  var date = new Date(bgnDate),
      dateArr = [],
      endD = getTimeEndMonth(endDate);

  filter = filter || function (d) {
    return d;
  };

  while (date < endD) {
    dateArr.push(filter(date));
    date = getMonthFromDate(date, 1);
  }

  return dateArr;
}; // return daily array of dates within the range of bgnDate and endDate. An
// optional filter function fn may be provided as the third parameter.
// 
// bgnDate will be the first element in the returned array


var yieldRangeDaily = function yieldRangeDaily(bgnDate, endDate, filter) {
  var bgnD = new Date(bgnDate),
      endD = new Date(endDate),
      dateArr = [],
      f = filter || function (d) {
    return d;
  };

  while (bgnD < endD) {
    dateArr.push(f(new Date(bgnD)));
    bgnD = getDayFromDate(bgnD, 1);
  }

  return dateArr;
}; // return an object whose properties define the elapsed time between
// bgnDate and endDate


var getElapsedTimeObj = function getElapsedTimeObj(bgnDate, endDate) {
  var ms = endDate.getTime() - bgnDate.getTime(),
      floor = Math.floor;
  return {
    ms: floor(ms) % 1000,
    sec: floor(ms / 1000) % 60,
    // ms in sec  : 1000
    min: floor(ms / 60000) % 60,
    // ms in min  : 1000 * 60,
    hour: floor(ms / 3600000) % 24,
    // ms in hour : 1000 * 60 * 60,
    day: floor(ms / 86400000) // ms in day  : 1000 * 60 * 60 * 24; 

  };
};

var getElapsedTimeFormatted = function getElapsedTimeFormatted(bgnDate, endDate) {
  var e = getElapsedTimeObj(bgnDate, endDate),
      min = (e.min.length > 1 ? '' : '0') + e.min,
      sec = (e.sec.length > 1 ? '' : '0') + e.sec,
      ms = e.ms.length > 2 ? e.ms[0] + e.ms[1] : e.ms;
  return min + ':' + (sec.length ? '' : '0') + sec + ':' + ms + ' (mm:ss:ms)';
}; // return true if given dates fall within the same range specified by `type`
// 
// are dates within the same `day`?
// are dates within the same `month`?
// are dates within the same `year`?
// 
// type === 'month' | 'year' | 'day'


var isDatesInRange = function isDatesInRange(dateObj1, dateObj2, type) {
  var d1YMDArr = getDateYMDStrArr(dateObj1),
      d2YMDArr = getDateYMDStrArr(dateObj2),
      isInRange = false;

  if (type === 'day') {
    isInRange = d1YMDArr[0] === d2YMDArr[0] && d1YMDArr[1] === d2YMDArr[1] && d1YMDArr[2] === d2YMDArr[2];
  } else if (type === 'month') {
    isInRange = d1YMDArr[0] === d2YMDArr[0] && d1YMDArr[1] === d2YMDArr[1];
  } else if (type === 'year') {
    isInRange = d1YMDArr[0] === d2YMDArr[0];
  }

  return isInRange;
}; // return a date that is formatted according to the given unicode formatStr
// http://cldr.unicode.org/translation/date-time
// 
// using this date object:
// var date = new Date(1365222221485),
// 
// each of the following formats would return a result given below:
// format: "MMMM d, y h:mm:ss a z"
// return: "April 5, 2013 9:23:41 pm 420"
// 
// format: "MMM d, y h:mm:ss a"
// return: "Apr 5, 2013 9:23:41 pm"
// 
// format: "M/d/yyyy h:mm a"
// return: "4/5/2013 9:23 pm"


var applyFormatDate = function applyFormatDate(date, format) {
  var d = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date(date);
  var YMDArr,
      year = d.getFullYear(),
      isInRange = year >= 0 && year <= 9999,
      hour,
      // eslint-disable-next-line max-len
  tzRe = /'[^']*'|"[^"]*"|yyyyy|yyyy|yyy|yy|y|MMMMM|MMMM|MMM|MM|M|ddddd|dddd|ddd|dd|d|EEEEE|EEEE|EEE|EE|E|hh|h|HH|H|mm|m|ss|s|zzzz|z|a|v/g;

  if (!isInRange) {//throw RangeError("formatDate: year must be 0000-9999");
  }

  YMDArr = getDateYMDStrArr(d);
  return format.replace(tzRe, function (match) {
    switch (match) {
      case "y":
        // year, numeric, full digit year, 1 to 4 digits
        return YMDArr[0].replace(/^00?0?/, '');

      case "yy":
        // year, numeric, exactly two digit
        return YMDArr[0].slice(2, 4);

      case "yyyy":
        // year, numeric, full year
        return YMDArr[0];

      case "yyyyy":
        // year, narrow, one char
        return YMDArr[0].slice(3, 4);

      case "M":
        // month, numeric, at least one digit
        return YMDArr[1].replace(/^0/, '');

      case "MM":
        // month, numeric, at least two digits, 0-padding
        return YMDArr[1];

      case "MMM":
        // month, alpha, abbreviated string
        // eslint-disable-next-line max-len
        return localeMethods_getNumericMonthNameAbbrev(YMDArr[1].replace(/^0/, ''));

      case "MMMM":
        // month, alpha, full string
        return localeMethods_getNumericMonthNameWide(YMDArr[1].replace(/^0/, ''));

      case "MMMMM":
        // month, alpha, narrow, one char
        // eslint-disable-next-line max-len
        return localeMethods_getNumericMonthNameAbbrev(YMDArr[1].replace(/^0/, ''))[0];

      case "d":
        // day, numeric, at least one digit
        return YMDArr[2].replace(/^0/, '');

      case "dd":
        // day, numeric, at least two digits, 0-padding
        return YMDArr[2];

      case "ddd":
        // day, alpha, abbreviated string
        return localeMethods_getNumericDayNameAbbrev(YMDArr[2].replace(/^0/, ''));

      case "dddd":
        // day, alpha, full string
        return localeMethods_getNumericDayNameWide(YMDArr[2].replace(/^0/, ''));

      case "ddddd":
        // day, alpha, narrow, one char
        // eslint-disable-next-line max-len
        return localeMethods_getNumericDayNameAbbrev(YMDArr[2].replace(/^0/, ''))[0];

      case "E":
        // day, alpha, abbreviated string
        return localeMethods_getNumericDayNameAbbrev(YMDArr[2].replace(/^0/, ''));

      case "EE":
        // day, alpha, abbreviated string
        return localeMethods_getNumericDayNameAbbrev(YMDArr[2].replace(/^0/, ''));

      case "EEE":
        // day, alpha, abbreviated string
        return localeMethods_getNumericDayNameAbbrev(YMDArr[2].replace(/^0/, ''));

      case "EEEE":
        // day, alpha, full string
        return localeMethods_getNumericDayNameWide(YMDArr[2].replace(/^0/, ''));

      case "EEEEE":
        // day, numeric, at least one digit
        return YMDArr[2].replace(/^0*/, '');

      case "h":
        // hour, numeric, at least one digit
        return d.getHours() % 12 || 12;

      case "hh":
        // hour, numeric, 12pm at least two digits, 0-padding
        return ("0" + (d.getHours() % 12 || 12)).slice(-2);

      case "HH":
        // hour, numeric, 24pm at least two digits, 0-padding
        return ("0" + d.getHours()).slice(-2);

      case "H":
        // hour, numeric, 24pm
        return d.getHours();

      case "m":
        // minute, numeric, at least one digit
        return d.getMinutes();

      case "mm":
        // minute, numeric, at least two digits, 0-padding
        return ("0" + d.getMinutes()).slice(-2);

      case "s":
        // second, numeric, at least one digit
        return d.getSeconds();

      case "ss":
        // second, numeric, at least two digits, 0-padding
        return ("0" + d.getSeconds()).slice(-2);

      case "a":
        // am, a, pm, p, noon, n (only used with `h`)
        return d.getHours() < 12 ? 'am' : 'pm';

      case "zzzz":
        // timezone, numeric, at least 4 digits, 0-padding
        return ("000" + d.getTimezoneOffset()).slice(-4);

      case "z":
        // timezone, numeric
        return d.getTimezoneOffset();

      case "v":
        // timezone, numeric
        return d.getTimezoneOffset();

      default:
        return match;
    }
  });
}; // remove all chars. all formatting
// tokenize around whitespace
// 10/1/2012 => 10 1 2012
// M/d/yyyy => M d yyyy
// 
// will break given:
// dStr: 10/1/2012039
// format: M/d/yyyy


var extractDateFormatted = function extractDateFormatted(dStr, format) {
  var x,
      ymdArr = [0, 0, 0, 0, 0, 0, 0, 0],
      ymdTestArr,
      token,
      tokenItem,
      finDateObj,
      formatRaw = format.replace(/[^\d\w]/gi, ' '),
      dStrRaw = dStr.replace(/[^\d\w]/gi, ' '),
      formatTokens = formatRaw.split(' '),
      dStrTokens = dStrRaw.split(' ');

  function getAsISO(tokenItem, dateStrObj) {
    var tokenItemL = tokenItem.toLowerCase(); //return Object.keys(dateStrObj)
    //  .find(key => dateStrObj[key].toLowerCase() === tokenItemL) || '';

    for (var o in dateStrObj) {
      if (dateStrObj.hasOwnProperty(o)) {
        if (dateStrObj[o].toLowerCase() === tokenItemL) return o;
      }
    }

    return '';
  }

  formatTokens.forEach(function (token, x) {
    tokenItem = dStrTokens[x];

    if (token.match(/yyyyy|yyyy|yyy|yy|y/)) {
      if (token === "y" && isNum(tokenItem)) {
        // year, numeric, full digit year, 1 to 4 digits
        if (tokenItem.match(/^\d\d?\d?\d?$/)) {
          ymdArr[0] = tokenItem + '';
        }
      } else if (token === "yy" && isNum(tokenItem)) {
        // year, numeric, exactly two digit
        if (tokenItem.match(/^\d\d$/)) {
          ymdArr[0] = tokenItem + '';
        }
      } else if (token === "yyyy" && isNum(tokenItem)) {
        // year, numeric, full year
        if (tokenItem.match(/^\d\d?\d?\d?$/)) {
          ymdArr[0] = tokenItem + '';
        }
      } else if (token === "yyyyy" && isNum(tokenItem)) {
        // year, narrow, one char
        if (tokenItem.match(/^\d?$/)) {
          ymdArr[0] = tokenItem + '';
        }
      }
    } else if (token.match(/MMMMM|MMMM|MMM|MM|M/)) {
      if (token === "M" && isNum(tokenItem)) {
        // month, numeric, at least one digit
        if (tokenItem.match(/^\d\d?$/)) {
          ymdArr[1] = tokenItem + '';
        }
      } else if (token === "MM" && isNum(tokenItem)) {
        // month, numeric, at least two digits, 0-padding
        if (tokenItem.match(/^\d\d?$/)) {
          ymdArr[1] = tokenItem + '';
        }
      } else if (token === "MMM") {
        // month, alpha, abbreviated string
        // eslint-disable-next-line max-len
        ymdArr[1] = getAsISO(tokenItem, localeMethods.getDateSymbolsMonthAbbrev());
      } else if (token === "MMMM") {
        // month, alpha, full string
        // eslint-disable-next-line max-len
        ymdArr[1] = getAsISO(tokenItem, localeMethods.getDateSymbolsMonthWide());
      } else if (token === "MMMMM") {
        // month, alpha, narrow, one char
        // eslint-disable-next-line max-len
        ymdArr[1] = getAsISO(tokenItem, localeMethods.getDateSymbolsMonthNarrow());
      }
    } else if (token.match(/ddddd|dddd|ddd|dd|d/)) {
      if (token === "d" && isNum(tokenItem)) {
        // day, numeric, at least one digit
        if (tokenItem.match(/^\d\d?$/)) {
          ymdArr[2] = tokenItem + '';
        }
      } else if (token === "dd" && isNum(tokenItem)) {
        // day, numeric, at least two digits, 0-padding
        if (tokenItem.match(/^\d\d?$/)) {
          ymdArr[2] = tokenItem + '';
        }
      } else if (token === "ddd") {
        // day, alpha, abbreviated string
        // eslint-disable-next-line max-len
        ymdArr[2] = getAsISO(tokenItem, localeMethods.getDateSymbolsDayAbbrev());
      } else if (token === "dddd") {
        // day, alpha, full string
        ymdArr[2] = getAsISO(tokenItem, localeMethods.getDateSymbolsDayWide());
      } else if (token === "ddddd") {
        // day, alpha, narrow, one char
        // eslint-disable-next-line max-len
        ymdArr[2] = getAsISO(tokenItem, localeMethods.getDateSymbolsDayNarrow());
      }
    } else if (token.match(/h|H/) && isNum(tokenItem)) {
      //hour. h for 12 hour, H for 24.
      if (token.match(/h/)) {
        ymdArr[3] = +tokenItem % 12 || 12;
      } else {
        ymdArr[3] = tokenItem + '';
      }
    } else if (token.match(/mm?/) && isNum(tokenItem)) {
      //minute
      ymdArr[4] = tokenItem + '';
    } else if (token.match(/ss?/) && isNum(tokenItem)) {
      //second
      ymdArr[5] = tokenItem + '';
    } else if (token.match(/a/)) {
      // am, a, pm, p, noon, n
      if (/pm?/.test(tokenItem)) {
        // assumes pm occurs after hour
        ymdArr[3] += 12;
      }
    } else if (token.match(/v|z/)) {
      // Pacific Time, Paris Time
      ymdArr[6] = tokenItem + '';
    }
  });

  if (ymdArr[0] && ymdArr[1] && ymdArr[2]) {
    // if `m` or `d` values are too large or small, dateObj is still
    // generated as per specificiation `15.9 Date Objects`
    // to avoid confusion we invalidate such dates by reconverting them
    // to ymdArr and checking the values to be sure they match
    //
    // ex. '01/40/1958' would not pass through here
    if (finDateObj = getYMDArrDate(ymdArr)) {
      ymdTestArr = getDateYMDNumArr(finDateObj);

      if (ymdTestArr[0] === +ymdArr[0] && ymdTestArr[1] === +ymdArr[1] && ymdTestArr[2] === +ymdArr[2]) {
        return finDateObj;
      }
    }
  }
};

var _default = {
  isNum: isNum,
  dateRegex: dateRegex,
  defFormatRegex: defFormatRegex,
  localeMethods: localeMethods,
  localeMethods_getNumericMonthNameAbbrev: localeMethods_getNumericMonthNameAbbrev,
  localeMethods_getNumericMonthNameWide: localeMethods_getNumericMonthNameWide,
  localeMethods_getNumericDayNameAbbrev: localeMethods_getNumericDayNameAbbrev,
  localeMethods_getNumericDayNameWide: localeMethods_getNumericDayNameWide,
  isDateObj: isDateObj,
  getDateYStr: getDateYStr,
  getDateMStr: getDateMStr,
  getDateDStr: getDateDStr,
  getDatehhStr: getDatehhStr,
  getDatemmStr: getDatemmStr,
  getDatessStr: getDatessStr,
  getDateYNum: getDateYNum,
  getDateMNum: getDateMNum,
  getDateDNum: getDateDNum,
  getDateYMDStrArr: getDateYMDStrArr,
  getDateYMDNumArr: getDateYMDNumArr,
  getYMDArrDate: getYMDArrDate,
  getSecFromDate: getSecFromDate,
  getSecFromTodayDate: getSecFromTodayDate,
  getMinFromDate: getMinFromDate,
  getMinFromTodayDate: getMinFromTodayDate,
  getHourFromDate: getHourFromDate,
  getHourFromTodayDate: getHourFromTodayDate,
  getDayFromDate: getDayFromDate,
  getDayFromTodayDate: getDayFromTodayDate,
  getMonthFromDate: getMonthFromDate,
  getMonthFromTodayDate: getMonthFromTodayDate,
  getYearFromDate: getYearFromDate,
  getYearFromTodayDate: getYearFromTodayDate,
  getDaysInMonth: getDaysInMonth,
  getMFittedYMDNumArr: getMFittedYMDNumArr,
  getDFittedYMDNumArr: getDFittedYMDNumArr,
  getFirstOfMonth: getFirstOfMonth,
  getLastOfMonth: getLastOfMonth,
  isDateBeforeDate: isDateBeforeDate,
  isDateBeforeToday: isDateBeforeToday,
  getTimeBgnMonth: getTimeBgnMonth,
  getTimeEndMonth: getTimeEndMonth,
  getTimeBgnDay: getTimeBgnDay,
  getTimeEndDay: getTimeEndDay,
  parseISO8601: parseISO8601,
  isDefISOFormat: isDefISOFormat,
  parseUSEndian: parseUSEndian,
  isDefUSEndianFormat: isDefUSEndianFormat,
  getDateAsISO: getDateAsISO,
  getEpochDateAsISO: getEpochDateAsISO,
  getDateAsUSEndian: getDateAsUSEndian,
  getEpochDateAsUSEndian: getEpochDateAsUSEndian,
  yieldRangeMonthly: yieldRangeMonthly,
  yieldRangeDaily: yieldRangeDaily,
  getElapsedTimeObj: getElapsedTimeObj,
  getElapsedTimeFormatted: getElapsedTimeFormatted,
  isDatesInRange: isDatesInRange,
  applyFormatDate: applyFormatDate,
  extractDateFormatted: extractDateFormatted
};
exports["default"] = _default;
