// Filename: simpletime.js  
// parts of this based on work found in comp.lang.javascript faq
//
// international and local date formats are specified using proper unicode 
// forms http://cldr.unicode.org/translation/date-time



const isNum = n => !Number.isNaN(Number.parseFloat(n));

const dateRegex = {
  iso : /^\s*(\d{4})[-/\.](\d\d)[-/\.](\d\d)\s*$/,
  usEndian : /^\s*(\d\d)[-/\.](\d\d)[-/\.](\d{4})\s*$/
};

const defFormatRegex = {
  iso : /yyyy[/.-]mm[/.-]dd/gi,
  usEndian : /mm[/.-]dd[/.-]yyyy/gi
};

const localeMethods = {
  getDateSymbolsMonthAbbrev : () => ({
    1 : "Jan",
    2 : "Feb",
    3 : "Mar",
    4 : "Apr",
    5 : "May",
    6 : "Jun",
    7 : "Jul",
    8 : "Aug",
    9 : "Sep",
    10 : "Oct",
    11 : "Nov",
    12 : "Dec"
  }),

  getDateSymbolsMonthWide : () => ({
    1 : "January",
    2 : "February",
    3 : "March",
    4 : "April",
    5 : "May",
    6 : "June",
    7 : "July",
    8 : "August",
    9 : "September",
    10 : "October",
    11 : "November",
    12 : "December"
  }),

  getDateSymbolsMonthNarrow : () => ({
    1 : "J",
    2 : "F",
    3 : "M",
    4 : "A",
    5 : "M",
    6 : "J",
    7 : "J",
    8 : "A",
    9 : "S",
    10 : "O",
    11 : "N",
    12 : "D"
  }),

  getDateSymbolsDayAbbrev : () => ([
    "sun", 
    "mon", 
    "tue", 
    "wed", 
    "thu", 
    "fri", 
    "sat"
  ]),

  getDateSymbolsDayWide : () => ([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ])
};

// abbreviated month name, ex. `Jan` or `Dec`
const localeMethods_getNumericMonthNameAbbrev = monthNum => (
  localeMethods.getDateSymbolsMonthAbbrev()[monthNum]);

// wide month name, ex. `January` or `December`
const localeMethods_getNumericMonthNameWide = monthNum => (
  localeMethods.getDateSymbolsMonthWide()[monthNum]);

// abbreviated day name, ex. `sun` or `thu`      
const localeMethods_getNumericDayNameAbbrev = dayNum => (
  localeMethods.getDateSymbolsDayAbbrev()[dayNum]);

// wide day name, ex. `Sunday` or `Thursday`      
const localeMethods_getNumericDayNameWide = dayNum => (
  localeMethods.getDateSymbolsDayWide()[dayNum]);

const isDateObj = dateObj => dateObj instanceof Date && !Number.isNaN(dateObj);

// ex. 2013, 0008, 0488
const getDateYStr = d => ("000" + d.getFullYear()).slice(-4);

// ex. 12, 10, 07, 04
const getDateMStr = d => ("0" + (d.getMonth() + 1)).slice(-2);

// ex. 12, 10, 07, 04, 30
const getDateDStr = d => ("0" + d.getDate()).slice(-2);

const getDatehhStr = d => ("0" + d.getHours()).slice(-2);
const getDatemmStr = d => ("0" + d.getMinutes()).slice(-2);
const getDatessStr = d => ("0" + d.getSeconds()).slice(-2);

// ex. 2013, 8, 488
const getDateYNum = d => d.getFullYear();

// ex. 12, 10, 7, 4
const getDateMNum = d => d.getMonth() + 1;

// ex. 12, 10, 7, 4, 30
const getDateDNum = d => d.getDate();

const getDateYMDStrArr = d => isDateObj(d) ? [
  getDateYStr(d),
  getDateMStr(d),
  getDateDStr(d)
  //that.getDatehhStr(d),
  //that.getDatemmStr(d),
  //that.getDatessStr(d)
] : [];

// return the date as array of numbers
// ex. [2013, 5, 5]
const getDateYMDNumArr = d => isDateObj(d) ? [
  getDateYNum(d),
  getDateMNum(d),
  getDateDNum(d)
]: [];

// return a new date object that has time of the given dateObj, defined to 
// the first second of the day.
const getTimeBgnDay = dateObj => {
  var d = new Date(dateObj || null);

  d.setMilliseconds(0);
  d.setSeconds(0);
  d.setMinutes(0);
  d.setHours(0);
  return d;
};

// return a new date object that has time of the given dateObj, defined to 
// the last second of the day.
const getTimeEndDay = dateObj => {
  var d = new Date(dateObj || null);

  d.setMilliseconds(998);
  d.setSeconds(59);
  d.setMinutes(59);
  d.setHours(23);
  return d;
};

// return number days that occur in the given month for the given year
const getDaysInMonth  = (yNum, mNum) => (
  new Date(yNum, mNum, 0).getDate());

// if M is greater than 12, a value of 12 (representing M) is returned
// if M is less than 12, a value of 0 (representing M) is returned
const getMFittedYMDNumArr = YMDNumArr => {
  let [ y, m, d ] = YMDNumArr;

  if (m <= 0) {
    m = 1;
  } else if (m > 12) {
    m = 12;
  }

  return [ y, m, d ];
};

// this method will return a YMDNumArr with a value of 'D' fitted to fall
// in the range of the date created by Y and M.
// 
// for example, if M has 28 days and D is 30, 28 is returned,
const getDFittedYMDNumArr = YMDNumArr => {
  let [ y, m, d ] = YMDNumArr,
      ymDays = getDaysInMonth(y, m);

  if (d <= 0) {
    d = 1;
  } else if (d > ymDays) {
    d = ymDays;
  }

  return [ y, m, d ];
};

// return date object from string OR number formatted ymdArr
const getYMDArrDate = (YMDArr = []) => {
  let [ y = 0, m = 0, d = 0, hh = 0, mm = 0, ss = 0, ms = 0 ] = YMDArr,
      date = null;

  if (isNum(y) && isNum(m) && isNum(d)) {
    date = new Date();
    date.setFullYear(+y, +m - 1, +d);
    date.setHours(
      isNum(hh) ? +hh : 0,
      isNum(mm) ? +mm : 0,
      isNum(ss) ? +ss : 0,
      isNum(ms) ? +ms : 0
    );
  }

  return date;
};

// return a date, with given number of minutes added
// number may be negative so that the returned date will be in the past
// 
// optNum: +2 goes forward two. -6 go back 6.
const getMinFromDate = (dateObj, optNum) => (
  new Date(dateObj.getTime() + optNum * 60 * 1000));

const getMinFromTodayDate = optNum => (
  getMinFromDate(new Date(), optNum));

// return a date, with given number of hours added
// number may be negative so that the returned date will be in the past
// 
// optNum: +2 goes forward two. -6 go back 6.
const getSecFromDate = (dateObj, optNum) => (
  new Date(dateObj.getTime() + optNum * 1000));

const getSecFromTodayDate = optNum => (
  getMinFromDate(new Date(), optNum));


// return a date, with given number of hours added
// number may be negative so that the returned date will be in the past
// 
// optNum: +2 goes forward two. -6 go back 6.
const getHourFromDate = (dateObj, optNum) => (
  new Date(dateObj.getTime() + optNum * 60 * 60 * 1000));

const getHourFromTodayDate = optNum => (
  getMinFromDate(new Date(), optNum));

// return a date, with given number of days added
// number may be negative so that the returned date will be in the past
// 
// optNum: +2 goes forward two. -6 go back 6.
const getDayFromDate = (dateObj, optNum) => {
  var num = 0, finDate = null,
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

const getDayFromTodayDate = optNum => (
  getDayFromDate(new Date(), optNum));

// return a date, with given number of months added
// number may be negative so that the returned date will be in the past
// 
// optNum: +2 goes forward two. -6 go back 6.
//
// if original date is on day 30 and new month is only 28 days long, the 
// returned month will have its day 'fitted' so that the new date object
// will be defined to the latest day of the month
const getMonthFromDate = (dateObj, optNum) => {
  var num = 0, finDate = null, diff,
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

const getMonthFromTodayDate = opt => (
  getDayFromDate(new Date(), opt));

// return a date, with given number of years added
// number may be negative so that the returned date will be in the past
// 
// optNum: +2 goes forward two. -6 go back 6.
const getYearFromDate = (dateObj, optNum) => {
  var YMDArr = getDateYMDNumArr(dateObj || new Date());

  if (isNum(optNum)) {
    YMDArr[0] += +optNum;
  }

  return getYMDArrDate(YMDArr);
};

const getYearFromTodayDate = optNum => (
  getYearFromDate(new Date(), optNum));

// return a new date object defined from the given date object
// returned date is defined to the first day of the month
// 
// if optNum is provided, optNum days are added to date object
const getFirstOfMonth = (dateObj, optNum) => {
  var YMDNumArr = getDateYMDNumArr(new Date(dateObj || null)), 
    finDate;

  YMDNumArr[2] = 1;
  if (isNum(optNum)) {
    YMDNumArr[2] += +optNum;
  }
  finDate = getYMDArrDate(YMDNumArr);
  finDate = getTimeBgnDay(finDate);

  return finDate;
};

// return a new date object defined from the given date object
// returned date is defined to the last day of the month
const getLastOfMonth = dateObj => (
  new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0));


// return true if the first date occurs `before` the second date
const isDateBeforeDate = (dateObj, beforeDateObj) => {
  var now = beforeDateObj,
    dateObj1 = dateObj, 
    year, yearNow, month, monthNow, date, dateNow;

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
};

// return true if the date occurs `before` today's date
const isDateBeforeToday = dateObj => (
  isDateBeforeDate(dateObj, new Date()));

// return a new date object that has time of the given dateObj, defined to 
// the first second of the first day of the month.
const getTimeBgnMonth = dateObj => {
  var dateYMDArr = getDateYMDStrArr(dateObj), finDateObj;

  dateYMDArr[2] = 1;
  finDateObj = getYMDArrDate(dateYMDArr);
  finDateObj = getTimeBgnDay(finDateObj);
  return finDateObj;
};

// return a new date object that has time of the given dateObj, defined to 
// the last second of the last day of the month.
const getTimeEndMonth = dateObj => {
  var dateYMDArr = getMonthFromDate(dateObj, 1), finDateObj;

  dateYMDArr = getDateYMDStrArr(dateYMDArr);
  dateYMDArr[2] = 0; // end of month
  finDateObj = getYMDArrDate(dateYMDArr);
  finDateObj = getTimeEndDay(finDateObj);
  return finDateObj;
};

// ISO 8601
// accept time as: yyyy.mm.dd, yyyy/mm/dd, yyyy-mm-dd
//
// return a date object from a simple ISO formatted date
const parseISO8601 = dateStringInRange => {
  var date = new Date(NaN), month,
    parts = dateStringInRange.match(dateRegex.iso);

  if (!parts) return null;
  month = +parts[2];
  date.setFullYear(parts[1], month - 1, parts[3]);
  if (month != date.getMonth() + 1) (date = date.getTime(NaN));
  return (date && isNum(date.getTime())) ? date : null;
};

const isDefISOFormat = format => defFormatRegex.iso.test(format);

// middle endian
// accept time as: mm.dd.yyyy, mm/dd/yyyy, mm-dd-yyyy
//
// return a date object from a simple US endian formatted date
const parseUSEndian = dateStringInRange => {
  var date = new Date(NaN), month,
    parts = dateStringInRange.match(dateRegex.usEndian);

  if (!parts) return null;
  month = +parts[1];
  date.setFullYear(parts[3], month - 1, parts[2]);
  if (month != date.getMonth() + 1) (date = date.getTime(NaN));
  return (date && isNum(date.getTime())) ? date : null;
};

const isDefUSEndianFormat = format => defFormatRegex.usEndian.test(format);

// return a simple ISO formatted date from a date object
// returns a date object in iso standard: yyyy/mm/dd
const getDateAsISO = dateInRange => {
  var year = dateInRange.getFullYear(),
    isInRange = year >= 0 && year <= 9999, yyyy, mm, dd;

  if (!isInRange) {
    throw RangeError("formatDate: year must be 0000-9999");
  }
  yyyy = ("000" + year).slice(-4);
  mm = ("0" + (dateInRange.getMonth() + 1)).slice(-2);
  dd = ("0" + (dateInRange.getDate())).slice(-2);
  return yyyy + "/" + mm + "/" + dd;
};

const getEpochDateAsISO = strEpoch => {
  var num, date = null;

  if (strEpoch && isNum(strEpoch)) {
    num = Number.parseInt(strEpoch, 10);
    date = new Date(num);
    if (date) date = getDateAsISO(date);
  }
  return date;
};

// return a simple US endian formatted date from a date object
// returns a date object in iso standard: mm-dd-yyyy
const getDateAsUSEndian = dateInRange => {
  var year = dateInRange.getFullYear(),
    isInRange = year >= 0 && year <= 9999, yyyy, mm, dd;

  if (!isInRange) throw RangeError("formatDate: year must be 0000-9999");
  yyyy = ("000" + year).slice(-4);
  mm = ("0" + (dateInRange.getMonth() + 1)).slice(-2);
  dd = ("0" + (dateInRange.getDate())).slice(-2);
  return mm + "/" + dd + '/' + yyyy;
};

// accepts a string or int epoch
const getEpochDateAsUSEndian = strEpoch => {
  var num, date;
  if (strEpoch && isNum(strEpoch)) {
    num = Number.parseInt(strEpoch, 10);
    date = new Date(num);
    if (date) return getDateAsUSEndian(date);
  }
  return null;
};

// return monthly array of dates within the range of bgnDate and endDate. An
// optional filter function fn may be provided as the third parameter.
// 
// bgnDate will be the first element in the returned array
const yieldRangeMonthly = (bgnDate, endDate, filter) => {
  var date = new Date(bgnDate), dateArr = [],
    endD = getTimeEndMonth(endDate);

  filter = filter || (d => d);

  while (date < endD) {
    dateArr.push(filter(date));
    date = getMonthFromDate(date, 1);
  }

  return dateArr;
};

// return daily array of dates within the range of bgnDate and endDate. An
// optional filter function fn may be provided as the third parameter.
// 
// bgnDate will be the first element in the returned array
const yieldRangeDaily = (bgnDate, endDate, filter) => {
  var bgnD = new Date(bgnDate),
    endD = new Date(endDate),
    dateArr = [],
    f = filter || (d => d);

  while (bgnD < endD) {
    dateArr.push(f(new Date(bgnD)));
    bgnD = getDayFromDate(bgnD, 1);
  }

  return dateArr;
};

// return an object whose properties define the elapsed time between
// bgnDate and endDate
const getElapsedTimeObj = (bgnDate, endDate) => {
  var ms = endDate.getTime() - bgnDate.getTime(),
    { floor } = Math;

  return {
    ms : floor(ms) % 1000, 
    sec : floor(ms / 1000) % 60,    // ms in sec  : 1000
    min : floor(ms / 60000) % 60,   // ms in min  : 1000 * 60,
    hour : floor(ms / 3600000) % 24, // ms in hour : 1000 * 60 * 60,
    day : floor(ms / 86400000)      // ms in day  : 1000 * 60 * 60 * 24; 
  };
};

const getElapsedTimeFormatted = (bgnDate, endDate) => {
  var e = getElapsedTimeObj(bgnDate, endDate),
    min = ((e.min.length > 1) ? '' : '0') + e.min,
    sec = ((e.sec.length > 1) ? '' : '0') + e.sec,
    ms = (e.ms.length > 2) ? (e.ms[0] + e.ms[1]) : e.ms;

  return min + ':' + (sec.length ? '' : '0') +
    sec + ':' + ms + ' (mm:ss:ms)';
};

// return true if given dates fall within the same range specified by `type`
// 
// are dates within the same `day`?
// are dates within the same `month`?
// are dates within the same `year`?
// 
// type === 'month' | 'year' | 'day'
const isDatesInRange = (dateObj1, dateObj2, type) => {
  var d1YMDArr = getDateYMDStrArr(dateObj1),
    d2YMDArr = getDateYMDStrArr(dateObj2),
    isInRange = false;

  if (type === 'day') {
    isInRange = (d1YMDArr[0] === d2YMDArr[0] &&
                 d1YMDArr[1] === d2YMDArr[1] &&
                 d1YMDArr[2] === d2YMDArr[2]);
  } else if (type === 'month') {
    isInRange = (d1YMDArr[0] === d2YMDArr[0] &&
                 d1YMDArr[1] === d2YMDArr[1]);
  } else if (type === 'year') {
    isInRange = d1YMDArr[0] === d2YMDArr[0];
  }
  return isInRange;
};

// return a date that is formatted according to the given unicode formatStr
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
const applyFormatDate = (date, format, d = new Date(date)) => {
  var YMDArr, year = d.getFullYear(),
    isInRange = year >= 0 && year <= 9999, hour,
    // eslint-disable-next-line max-len
    tzRe = /'[^']*'|"[^"]*"|yyyyy|yyyy|yyy|yy|y|MMMMM|MMMM|MMM|MM|M|ddddd|dddd|ddd|dd|d|EEEEE|EEEE|EEE|EE|E|hh|h|HH|H|mm|m|ss|s|zzzz|z|a|v/g;

  if (!isInRange) {
    //throw RangeError("formatDate: year must be 0000-9999");
  }
  YMDArr = getDateYMDStrArr(d);

  return format.replace(tzRe, match => {
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
      return (d.getHours() % 12) || 12;
    case "hh":
      // hour, numeric, 12pm at least two digits, 0-padding
      return ("0" + ((d.getHours() % 12) || 12)).slice(-2);
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
      return (d.getHours() < 12) ? 'am' : 'pm';
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
};



// remove all chars. all formatting
// tokenize around whitespace
// 10/1/2012 => 10 1 2012
// M/d/yyyy => M d yyyy
// 
// will break given:
// dStr: 10/1/2012039
// format: M/d/yyyy
const extractDateFormatted = (dStr, format) => {
  var x, ymdArr = [ 0,0,0,0,0,0,0,0 ], ymdTestArr, token, tokenItem, finDateObj,
    formatRaw = format.replace(/[^\d\w]/gi, ' '),
    dStrRaw = dStr.replace(/[^\d\w]/gi, ' '),
    formatTokens = formatRaw.split(' '),
    dStrTokens = dStrRaw.split(' ');

  function getAsISO (tokenItem, dateStrObj) {
    var tokenItemL = tokenItem.toLowerCase();

    //return Object.keys(dateStrObj)
    //  .find(key => dateStrObj[key].toLowerCase() === tokenItemL) || '';
    for (var o in dateStrObj) {
      if (dateStrObj.hasOwnProperty(o)) {
        if (dateStrObj[o].toLowerCase() === tokenItemL) return o;
      }
    }
    return '';
  }

  formatTokens.forEach((token, x) => {
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
    if ((finDateObj = getYMDArrDate(ymdArr))) {
      ymdTestArr = getDateYMDNumArr(finDateObj);
      if (ymdTestArr[0] === +ymdArr[0] &&
          ymdTestArr[1] === +ymdArr[1] &&
          ymdTestArr[2] === +ymdArr[2]) {
        return finDateObj;
      }
    }
  }
};

export default {
  isNum,
  dateRegex,
  defFormatRegex,
  localeMethods,
  localeMethods_getNumericMonthNameAbbrev,
  localeMethods_getNumericMonthNameWide,
  localeMethods_getNumericDayNameAbbrev,
  localeMethods_getNumericDayNameWide,
  isDateObj,
  getDateYStr,
  getDateMStr,
  getDateDStr,
  getDatehhStr,
  getDatemmStr,
  getDatessStr,
  getDateYNum,
  getDateMNum,
  getDateDNum,
  getDateYMDStrArr,
  getDateYMDNumArr,
  getYMDArrDate,
  getSecFromDate,
  getSecFromTodayDate,
  getMinFromDate,
  getMinFromTodayDate,
  getHourFromDate,
  getHourFromTodayDate,
  getDayFromDate,
  getDayFromTodayDate,
  getMonthFromDate,
  getMonthFromTodayDate,
  getYearFromDate,
  getYearFromTodayDate,
  getDaysInMonth,
  getMFittedYMDNumArr,
  getDFittedYMDNumArr,
  getFirstOfMonth,
  getLastOfMonth,
  isDateBeforeDate,
  isDateBeforeToday,
  getTimeBgnMonth,
  getTimeEndMonth,
  getTimeBgnDay,
  getTimeEndDay,
  parseISO8601,
  isDefISOFormat,
  parseUSEndian,
  isDefUSEndianFormat,
  getDateAsISO,
  getEpochDateAsISO,
  getDateAsUSEndian,
  getEpochDateAsUSEndian,
  yieldRangeMonthly,
  yieldRangeDaily,
  getElapsedTimeObj,
  getElapsedTimeFormatted,
  isDatesInRange,
  applyFormatDate,
  extractDateFormatted
};
