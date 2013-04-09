// Filename: simpleTime.js  
// Timestamp: 2013.04.08-21:16:42 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)  
//
// 
// parts of this based on work found in comp.lang.javascript faq
//
// simpleTime namespace is defined here with a property named 'localeMethods'. 
// localeMethods are rederined by worldTime, which uses this script to provide
// internationalized time formatted methods.
//
// international and local date formats are specified using proper unicode 
// forms http://cldr.unicode.org/translation/date-time

var simpleTime = module.exports = (function () {

  function isNum (n) {
    return !isNaN(parseFloat(n)) ? true : false;    
  }

  if (typeof Date.now === 'undefined') {
    Date.now = function () {
      return (new Date()).getTime();
    };
  }

  return {
    // used by worldTime script
    // localeMap : {},
    localeMethods : {
      getDateSymbolsMonthAbbrev : function () {
        return {
          1:"Jan",
          2:"Feb",
          3:"Mar",
          4:"Apr",
          5:"May",
          6:"Jun",
          7:"Jul",
          8:"Aug",
          9:"Sep",
          10:"Oct",
          11:"Nov",
          12:"Dec"
        };      
      },
      getDateSymbolsMonthWide : function () {
        return {
          1:"January",
          2:"February",
          3:"March",
          4:"April",
          5:"May",
          6:"June",
          7:"July",
          8:"August",
          9:"September",
          10:"October",
          11:"November",
          12:"December"
        };
      },
      getDateSymbolsMonthNarrow : function () {
        return {
          1:"J",
          2:"F",
          3:"M",
          4:"A",
          5:"M",
          6:"J",
          7:"J",
          8:"A",
          9:"S",
          10:"O",
          11:"N",
          12:"D"
        };
      },
      getDateSymbolsDayAbbrev : function () {
        return [
          "sun", 
          "mon", 
          "tue", 
          "wed", 
          "thu", 
          "fri", 
          "sat"
        ];      
      },
      getDateSymbolsDayWide : function () {
        return [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ];      
      },

      // abbreviated month name, ex. `Jan` or `Dec`
      getNumericMonthNameAbbrev : function (monthNum) {
        return this.getDateSymbolsMonthAbbrev()[monthNum];
      },

      // wide month name, ex. `January` or `December`
      getNumericMonthNameWide : function (monthNum) {
        return this.getDateSymbolsMonthWide()[monthNum];
      },

      // abbreviated day name, ex. `sun` or `thu`      
      getNumericDayNameAbbrev : function (dayNum) {
        return this.getDateSymbolsDayAbbrev()[dayNum];
      },

      // wide day name, ex. `Sunday` or `Thursday`      
      getNumericDayNameWide : function (dayNum) {
        return this.getDateSymbolsDayWide()[dayNum];
      }
    },

    
    isDateObj: function (dateObj) {
      return (typeof dateObj === 'object' && 
              dateObj && 'getTime' in dateObj) ? true : false;
    },
  
    dateRegex: {
      iso: /^\s*(\d{4})[-/\.](\d\d)[-/\.](\d\d)\s*$/,
      usEndian: /^\s*(\d\d)[-/\.](\d\d)[-/\.](\d{4})\s*$/
    },
    defFormatRegex: {
      iso: /yyyy[/.-]mm[/.-]dd/gi,
      usEndian: /mm[/.-]dd[/.-]yyyy/gi
    },

    // WARNING: THESE METHODS ASSUME VALID INPUT

    // ex. 2013, 0008, 0488
    getDateYStr: function (d) {
      return ("000" + d.getFullYear()).slice(-4);
    },

    // ex. 12, 10, 07, 04
    getDateMStr: function (d) {
      return ("0" + (d.getMonth() + 1)).slice(-2);
    },

    // ex. 12, 10, 07, 04, 30
    getDateDStr: function (d) {
      return ("0" + d.getDate()).slice(-2);
    },

    // ex. 2013, 8, 488
    getDateYNum: function (d) {
      return d.getFullYear();
    },

    // ex. 12, 10, 7, 4
    getDateMNum: function (d) {
      return d.getMonth() + 1;
    },

    // ex. 12, 10, 7, 4, 30
    getDateDNum: function (d) {
      return d.getDate();
    },

    getDateYMDStrArr: function (d) {
      var that = this;
      if (that.isDateObj(d)) {
        return [
          that.getDateYStr(d),
          that.getDateMStr(d),
          that.getDateDStr(d)
        ];
      };
    },

    // return the date as array of numbers
    // ex. [2013, 5, 5]
    getDateYMDNumArr: function (d) {
      var that = this;
      if (that.isDateObj(d)) {
        return [
          that.getDateYNum(d),
          that.getDateMNum(d),
          that.getDateDNum(d)          
        ];
      };
    },

    // return date object from string OR number formatted ymdArr
    getYMDArrDate: function (YMDArr) {
      var y = YMDArr[0],
          m = YMDArr[1],
          d = YMDArr[2],
          date = null;
      if (isNum(y) && isNum(m) && isNum(d)) {
        date = new Date();
        date.setFullYear(+y, +m - 1, +d);        
      }
      return date;
    },

    // return a date, with given number of minutes added
    // number may be negative so that the returned date will be in the past
    // 
    // optNum: +2 goes forward two. -6 go back 6.
    getMinFromDate: function (dateObj, optNum) {
      return new Date(dateObj.getTime() + optNum * 60 * 1000);
    },

    getMinFromTodayDate: function (optNum) {
      return this.getMinFromDate(new Date(), optNum);
    },

    // return a date, with given number of days added
    // number may be negative so that the returned date will be in the past
    // 
    // optNum: +2 goes forward two. -6 go back 6.
    getDayFromDate: function (dateObj, optNum) {
      var that = this, num = 0, finDate = null,
          YMDNumArr = that.getDateYMDNumArr(dateObj || new Date());

      if (YMDNumArr) {      
        if (typeof optNum === 'string') {
          if (isNum(optNum)) {
            num = parseInt(+optNum, 10);
          }
        } else if (typeof optNum === 'number') {
          num = +optNum;          
        }

        if (num) YMDNumArr[2] += num;      
        finDate = that.getYMDArrDate(YMDNumArr);
      }

      return finDate;
    },

    getDayFromTodayDate: function (optNum) {
      return this.getDayFromDate(new Date(), optNum);
    },

    // return a date, with given number of months added
    // number may be negative so that the returned date will be in the past
    // 
    // optNum: +2 goes forward two. -6 go back 6.
    //
    // if original date is on day 30 and new month is only 28 days long, the 
    // returned month will have its day 'fitted' so that the new date object
    // will be defined to the latest day of the month
    getMonthFromDate: function (dateObj, optNum) {
      var that = this, num = 0, finDate = null, diff,
          YMDNumArr = that.getDateYMDNumArr(dateObj || new Date());

      if (YMDNumArr) {      
        if (typeof optNum === 'string') {
          if (isNum(optNum)) {
            num = parseInt(+optNum, 10);
          }
        } else if (typeof optNum === 'number') {
          num = +optNum;          
        }

        if (num) {
          YMDNumArr[1] += num;      
          YMDNumArr = that.getDFittedYMDNumArr(YMDNumArr);
        }
        finDate = that.getYMDArrDate(YMDNumArr);
      }

      return finDate;
    },

    getMonthFromTodayDate: function (opt) {
      return this.getDayFromDate(new Date(), opt);
    },

    // return a date, with given number of years added
    // number may be negative so that the returned date will be in the past
    // 
    // optNum: +2 goes forward two. -6 go back 6.
    getYearFromDate: function (dateObj, optNum) {
      var that = this, 
          YMDArr = that.getDateYMDNumArr(dateObj || new Date()),
          newDate, diff;

      if (isNum(optNum)) {
        YMDArr[0] += +optNum;
      }

      return that.getYMDArrDate(YMDArr);
    },

    getYearFromTodayDate: function (optNum) {
      return this.getYearFromDate(new Date(), optNum);
    },

    // http://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
    // return number of days that occur in the given month for the given year
    getDaysInMonth : function (mNum ,yNum) {
      return new Date(mNum, yNum, 0).getDate();
    },

    // if M is greater than 12, a value of 12 (representing M) is returned
    // if M is less than 12, a value of 0 (representing M) is returned
    getMFittedYMDNumArr : function (YMDNumArr) {
      var that = this, daysInMonthNum,
          y = YMDNumArr[0],
          m = YMDNumArr[1],
          d = YMDNumArr[2];

      if (m <= 0) {
        m = 1;
      } else if (m > 12) {
        m = 12;
      }

      return [y, m, d];
    },

    // this method will return a YMDNumArr with a value of 'D' fitted to fall
    // in the range of the date created by Y and M.
    // 
    // for example, if M has 28 days and D is 30, 28 is returned,
    getDFittedYMDNumArr : function (YMDNumArr) {
      var that = this, daysInMonthNum,
          y = YMDNumArr[0],
          m = YMDNumArr[1],
          d = YMDNumArr[2],
          ymDate = that.getYMDArrDate([y, m, 1]),
          ymDays = that.getDaysInMonth(ymDate[0], ymDate[1]);

      if (d <= 0) {
        d = 1;
      } else if (d > ymDays) {
        d = ymDays;
      }

      return [y, m, d];
    },

    // return a new date object defined from the given date object
    // returned date is defined to the first day of the month
    // 
    // if optNum is provided, optNum days are added to date object
    getFirstOfMonth: function (dateObj, optNum) {
      var that = this, 
          YMDNumArr = that.getDateYMDNumArr(new Date(dateObj || null)), 
          finDate;

      YMDNumArr[2] = 1;
      if (isNum(optNum)) {
        YMDNumArr[2] += +optNum;
      }
      finDate = that.getYMDArrDate(YMDNumArr);
      finDate = that.getTimeBgnDay(finDate);

      return finDate;
    },

    // return a new date object defined from the given date object
    // returned date is defined to the last day of the month
    getLastOfMonth: function (dateObj) {
      return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
    },

    // return true if the first date occurs `before` the second date
    isDateBeforeDate: function (dateObj, beforeDateObj) {
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
    },

    // return true if the date occurs `before` today's date
    isDateBeforeToday: function (dateObj) {
      this.isDateBeforeDate(dateObj, new Date());
    },

    // return a new date object that has time of the given dateObj, defined to 
    // the first second of the first day of the month.
    getTimeBgnMonth: function (dateObj) {
      var that = this, dateYMDArr = that.getDateYMDStrArr(dateObj), finDateObj;

      dateYMDArr[2] = 1;
      finDateObj = that.getYMDArrDate(dateYMDArr);
      finDateObj = that.getTimeBgnDay(finDateObj);
      return finDateObj;
    },

    // return a new date object that has time of the given dateObj, defined to 
    // the last second of the last day of the month.
    getTimeEndMonth: function (dateObj) {
      var that = this, dateYMDArr = that.getMonthFromDate(dateObj, 1), finDateObj;

      dateYMDArr = that.getDateYMDStrArr(dateYMDArr);
      dateYMDArr[2] = 0; // end of month
      finDateObj = that.getYMDArrDate(dateYMDArr);
      finDateObj = that.getTimeEndDay(finDateObj);
      return finDateObj;
    },

    // return a new date object that has time of the given dateObj, defined to 
    // the first second of the day.
    getTimeBgnDay: function (dateObj) {
      var d = new Date(dateObj || null);

      d.setMilliseconds(0);
      d.setSeconds(0);
      d.setMinutes(0);
      d.setHours(0);
      return d;
    },

    // return a new date object that has time of the given dateObj, defined to 
    // the last second of the day.
    getTimeEndDay: function (dateObj) {
      var d = new Date(dateObj || null);

      d.setMilliseconds(998);
      d.setSeconds(59);
      d.setMinutes(59);
      d.setHours(23);
      return d;
    },

    // ISO 8601
    // accept time as: yyyy.mm.dd, yyyy/mm/dd, yyyy-mm-dd
    //
    // return a date object from a simple ISO formatted date
    parseISO8601: function (dateStringInRange) {
      var date = new Date(NaN), month,
          parts = dateStringInRange.match(this.dateRegex.iso);

      if (!parts) return null;
      month = +parts[2];
      date.setFullYear(parts[1], month - 1, parts[3]);
      if (month != date.getMonth() + 1) (date = date.getTime(NaN));
      return (date && isNum(date.getTime())) ? date : null;
    },

    isDefISOFormat: function (format) {
      return format.match(this.defFormatRegex.iso) ? true : false;
    },

    // middle endian
    // accept time as: mm.dd.yyyy, mm/dd/yyyy, mm-dd-yyyy
    //
    // return a date object from a simple US endian formatted date
    parseUSEndian: function (dateStringInRange) {
      var date = new Date(NaN), month,
          parts = dateStringInRange.match(this.dateRegex.usEndian);

      if (!parts) return null;
      month = +parts[1];
      date.setFullYear(parts[3], month - 1, parts[2]);
      if (month != date.getMonth() + 1) (date = date.getTime(NaN));
      return (date && isNum(date.getTime())) ? date : null;
    },

    isDefUSEndianFormat: function (format) {
      return format.match(this.defFormatRegex.usEndian) ? true : false;
    },

    // return a simple ISO formatted date from a date object
    // returns a date object in iso standard: yyyy/mm/dd
    getDateAsISO: function (dateInRange) {
      var year = dateInRange.getFullYear(),
          isInRange = year >= 0 && year <= 9999, yyyy, mm, dd;

      if (!isInRange) {
        throw RangeError("formatDate: year must be 0000-9999");
      }
      yyyy = ("000" + year).slice(-4);
      mm = ("0" + (dateInRange.getMonth() + 1)).slice(-2);
      dd = ("0" + (dateInRange.getDate())).slice(-2);
      return yyyy + "/" + mm + "/" + dd;
    },

    getEpochDateAsISO: function (strEpoch) {
      var num, date = null;

      if (strEpoch && isNum(strEpoch)) {
        num = parseInt(strEpoch, 10);
        date = new Date(num);
        if (date) date = this.getDateAsISO(date);
      }
      return date;
    },

    // return a simple US endian formatted date from a date object
    // returns a date object in iso standard: mm-dd-yyyy
    getDateAsUSEndian: function (dateInRange) {
      var year = dateInRange.getFullYear(),
          isInRange = year >= 0 && year <= 9999, yyyy, mm, dd;

      if (!isInRange) throw RangeError("formatDate: year must be 0000-9999");
      yyyy = ("000" + year).slice(-4);
      mm = ("0" + (dateInRange.getMonth() + 1)).slice(-2);
      dd = ("0" + (dateInRange.getDate())).slice(-2);
      return mm + "/" + dd + '/' + yyyy;
    },

    // accepts a string or int epoch
    getEpochDateAsUSEndian: function (strEpoch) {
      var num, date;
      if (strEpoch && (isNum(strEpoch))) {
        num = parseInt(strEpoch, 10);
        date = new Date(num);
        if (date) return this.getDateAsUSEndian(date);
      }
      return null;
    },

    // return monthly array of dates within the range of bgnDate and endDate. An
    // optional filter function fn may be provided as the third parameter.
    // 
    // bgnDate will be the first element in the returned array
    yieldRangeMonthly: function (bgnDate, endDate, filter) {
      var that = this, date = new Date(bgnDate), dateArr = [],
          endD = that.getTimeEndMonth(endDate);

      filter = filter || function (d) {
        return d;
      };

      while (date < endD) {
        dateArr.push(filter(date));
        date = that.getMonthFromDate(date, 1);
      }

      return dateArr;
    },

    // return daily array of dates within the range of bgnDate and endDate. An
    // optional filter function fn may be provided as the third parameter.
    // 
    // bgnDate will be the first element in the returned array
    yieldRangeDaily: function (bgnDate, endDate, filter) {
      var bgnD = new Date(bgnDate),
          endD = new Date(endDate),
          that = this,
          dateArr = [],
          f = filter || function (o) {
            return o;
          };

      while (bgnD < endD) {
        dateArr.push(f(bgnD));
        bgnD = that.getDayFromDate(bgnD, 1);
      }

      return dateArr;
    },

    // return an object whose properties define the elapsed time between
    // bgnDate and endDate
    getElapsedTimeObj: function (bgnDate, endDate) {
      var ms = endDate.getTime() - bgnDate.getTime(),
          floor = Math.floor;

      return {
        ms   : floor(ms), 
        sec  : floor(ms / 1000) % 60,    // ms in sec  : 1000
        min  : floor(ms / 60000) % 60,   // ms in min  : 1000 * 60,
        hour : floor(ms / 3600000) % 24, // ms in hour : 1000 * 60 * 60,
        day  : floor(ms / 86400000)      // ms in day  : 1000 * 60 * 60 * 24;        
      };
    },

    getElapsedTimeFormatted: function (bgnDate, endDate) {
      var e = this.getElapsedTimeObj(bgnDate, endDate),
          min = ((e.min.length > 1) ? '' : '0') + e.min,
          sec = ((e.sec.length > 1) ? '' : '0') + e.sec,
          ms = (e.ms.length > 2) ? (e.ms[0] + e.ms[1]) : e.ms;

      return min + ':' + (sec.length ? '' : '0') +
        sec + ':' + ms + ' (mm:ss:ms)';
    },

    // return true if given dates fall within the same range specified by `type`
    // 
    // are dates within the same `day`?
    // are dates within the same `month`?
    // are dates within the same `year`?
    // 
    // type === 'month' | 'year' | 'day'
    isDatesInRange: function (dateObj1, dateObj2, type) {
      var that = this,
          d1YMDArr = that.getDateYMDStrArr(dateObj1),
          d2YMDArr = that.getDateYMDStrArr(dateObj2),
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
    },

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
    applyFormatDate: function (d, format) {
      var that = this, YMDArr, year = d.getFullYear(),
          isInRange = year >= 0 && year <= 9999, hour,
          localeMethods = that.localeMethods,
          tzRe = /yyyyy|yyyy|yyy|yy|y|MMMMM|MMMM|MMM|MM|M|ddddd|dddd|ddd|dd|d|hh|h|HH|H|mm|m|ss|s|zzzz|z|a|v/g;

      if (!isInRange) {
        //throw RangeError("formatDate: year must be 0000-9999");
      }
      YMDArr = that.getDateYMDStrArr(d);
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
          return localeMethods.getNumericMonthNameAbbrev(YMDArr[1].replace(/^0/, ''));
        case "MMMM":
          // month, alpha, full string
          return localeMethods.getNumericMonthNameWide(YMDArr[1].replace(/^0/, ''));
        case "MMMMM":
          // month, alpha, narrow, one char
          return localeMethods.getNumericMonthNameAbbrev(YMDArr[1].replace(/^0/, ''))[0];
        case "d":
          // day, numeric, at least one digit
          return YMDArr[2].replace(/^0/, '');
        case "dd":
          // day, numeric, at least two digits, 0-padding
          return YMDArr[2];
        case "ddd":
          // day, alpha, abbreviated string
          return localeMethods.getNumericDayNameAbbrev(YMDArr[2].replace(/^0/, ''));
        case "dddd":
          // day, alpha, full string
          return localeMethods.getNumericDayNameWide(YMDArr[2].replace(/^0/, ''));
        case "ddddd":
          // day, alpha, narrow, one char
          return localeMethods.getNumericDayNameAbbrev(YMDArr[2].replace(/^0/, ''))[0];
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
          //????http://stackoverflow.com/questions/1091372/getting-the-clients-timezone-in-javascript
          // timezone, numeric, at least 4 digits, 0-padding
          return ("000" + d.getTimezoneOffset()).slice(-4);
        case "z":
          // timezone, numeric
          return d.getTimezoneOffset();
        case "v":
          // timezone, numeric
          return d.getTimezoneOffset();
        default:
          return '';
        }

      });
    },



    // remove all chars. all formatting
    // tokenize around whitespace
    // 10/1/2012 => 10 1 2012
    // M/d/yyyy => M d yyyy
    // 
    // will break given:
    // dStr: 10/1/2012039
    // format: M/d/yyyy
    extractDateFormatted: function (dStr, format) {
      var that = this, x, ymdArr = [], ymdTestArr, token, tokenItem, finDateObj,
          formatRaw = format.replace(/[^\d\w]/gi, ' '),
          dStrRaw = dStr.replace(/[^\d\w]/gi, ' '),
          formatTokens = formatRaw.split(' '),
          dStrTokens = dStrRaw.split(' ');

      function getAsISO(tokenItem, dateStrObj) {
        var tokenItemL = tokenItem.toLowerCase();
        for (var o in dateStrObj) {
          if (dateStrObj.hasOwnProperty(o)) {
            if (dateStrObj[o].toLowerCase() === tokenItemL) return o;
          }
        }
        return '';
      }

      for (x = formatTokens.length; x--;) {
        token = formatTokens[x];
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
            ymdArr[1] = getAsISO(tokenItem, that.localeMethods.getDateSymbolsMonthAbbrev());
          } else if (token === "MMMM") {
            // month, alpha, full string
            ymdArr[1] = getAsISO(tokenItem, that.localeMethods.getDateSymbolsMonthWide());
          } else if (token === "MMMMM") {
            // month, alpha, narrow, one char
            ymdArr[1] = getAsISO(tokenItem, that.localeMethods.getDateSymbolsMonthNarrow());
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
            // following the standard here is too strict here.
            //  } else if (token === "ddd") {
            //    // day, alpha, abbreviated string
            //    ymdArr[1] = getAsISO(tokenItem, dateSymbols.days.format.abbreviated);
            //  } else if (token === "dddd") {
            //    // day, alpha, full string
            //    ymdArr[1] = getAsISO(tokenItem, dateSymbols.days.format.wide);
            //  } else if (token === "ddddd") {
            //   // day, alpha, narrow, one char
            //   ymdArr[1] = getAsISO(tokenItem, dateSymbols.days.format.narrow);
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
          ymdArr[6] = tokenItem + '';
        } else if (token.match(/v|z/)) {
          // Pacific Time, Paris Time
          ymdArr[7] = tokenItem + '';
        }
      }
      if (ymdArr[0] && ymdArr[1] && ymdArr[2]) {
        // if `m` or `d` values are too large or small, dateObj is still
        // generated as per specificiation `15.9 Date Objects`
        // to avoid confusion we invalidate such dates by reconverting them
        // to ymdArr and checking the values to be sure they match
        //
        // ex. '01/40/1958' would not pass through here
        if ((finDateObj = that.getYMDArrDate(ymdArr))) {
          ymdTestArr = that.getDateYMDStrArr(finDateObj);
          if (+ymdTestArr[0] === +ymdArr[0] &&
              +ymdTestArr[1] === +ymdArr[1] &&
              +ymdTestArr[2] === +ymdArr[2]) {
            return finDateObj;
          }
        }
      }
    }
  };

}());



