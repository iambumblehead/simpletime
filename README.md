simpleTime
==========
**(c)[Bumblehead][0], 2013,2014,2015,2016** [MIT-license](#license)

### overview

simpletime functions manipulatie dates and convert dates to and from unicode format. It does not provide internationalized dates -use [worldtime][1] for that.

what's good about this script:

 * format and unformat dates using unicode [forms][2]
 * create and use `YMDArr` objects to simplify time manipulation
 * does not depend on a library

[0]: http://www.bumblehead.com                            "bumblehead"
[1]: http://github.com/iambumblehead/worldtime            "worldtime"
[2]: http://cldr.unicode.org/translation/date-time        "unicode"


---------------------------------------------------------
#### <a id="functions">functions

 * **isDateObj ( _dateObj_ )**

  returns a `boolean`, is the given dateObj a valid Date object?

  ex,

  ```javascript
  simpletime.isDateObj(new Date()) // true
  ```

 * **getDateYNum ( _dateObj_ )**
 
  returns a `number`, the year on the date object.

  ex,

  ```javascript
  simpletime.getDateYNum(new Date()) // 2016
  ```

 * **getDateYStr ( _dateObj_ )**
   
  returns a `string`, the year on the date object.

  ex,

  ```javascript
  simpletime.getDateYStr(new Date()) // '2016'
  ```

 * **getDateMNum ( _dateObj_ )**

  returns a `number`, the month on the date object.

  ex,

  ```javascript
  simpletime.getDateMNum(new Date()) // 12
  ```
   
 * **getDateMStr ( _dateObj_ )**

  returns a `string`, the month on the date object.

  ex,

  ```javascript
  simpletime.getDateMStr(new Date()) // '12'
  ```

 * **getDateDNum ( _dateObj_ )**

  returns a `number`, the day on the date object.

  ex,

  ```javascript
  simpletime.getDateDNum(new Date()) // 31
  ```

 * **getDateDStr ( _dateObj_ )**

  returns a `string`, the day on the date object.

  ex,

  ```javascript
  simpletime.getDateDStr(new Date()) // '31'
  ```

 * **getDateYMDNumArr ( _dateObj_ )**
   
  return an array of numbers, the YNum, MNum and DNum of a date object.

  ex,

  ```javascript
  simpletime.getDateYMDNumArr(new Date()) // [2016, 12, 31]
  ```
   
 * **getDateYMDStrArr ( _dateObj_ )**

  return an array of strings, the YStr, MStr and DStr of a date object.

  ex,

  ```javascript
  simpletime.getDateYMDStrArr(new Date()) // ['2016', '12', '31']
  ```

 * **getYMDArrDate ( _ymdArr_ )**
   
  return a Date object from a YMDNumArr or YMDStrArr

  ex,

  ```javascript
  simpletime.getYMDArrDate([2016, 12, 31]) // Sat Dec 31 2016 17:43:20 GMT-0800 (PST)
  ```

 * **getMinFromDate ( _dateObj_,  _optNum_ )**

  return a Date object with given number of minutes added.

  ex,

  ```javascript
  var date = new Date('Sat Dec 31 2016 17:43:20 GMT-0800 (PST)');
    
  simpletime.getMinFromDate(date, 5);   // Sat Dec 31 2016 17:48:20 GMT-0800 (PST)
  simpletime.getMinFromDate(date, 50);  // Sat Dec 31 2016 18:33:20 GMT-0800 (PST)
  simpletime.getMinFromDate(date, -5);  // Sat Dec 31 2016 17:38:20 GMT-0800 (PST)
  simpletime.getMinFromDate(date, -50); // Sat Dec 31 2016 16:53:20 GMT-0800 (PST)
  ```

 * **getMinFromTodayDate ( _optNum_ )**

  returns a Date object with given number of minutes added to now's new Date()

  ex

  ```javascript
  simpletime.getMinFromTodayDate(5);   // Sat Dec 31 2016 17:48:20 GMT-0800 (PST)
  simpletime.getMinFromTodayDate(50);  // Sat Dec 31 2016 18:33:20 GMT-0800 (PST)
  simpletime.getMinFromTodayDate(-5);  // Sat Dec 31 2016 17:38:20 GMT-0800 (PST)
  simpletime.getMinFromTodayDate(-50); // Sat Dec 31 2016 16:53:20 GMT-0800 (PST)
  ```

 * **getDayFromDate ( _dateObj_,  _optNum_ )**

  returns a Date object with given number of days added

  ex,

  ```javascript
  var date = new Date('Sat Dec 31 2016 17:43:20 GMT-0800 (PST)');
  
  simpletime.getDayFromDate(date, 5);   // Thu Jan 05 2017 17:55:40 GMT-0800 (PST)
  simpletime.getDayFromDate(date, 50);  // Sun Feb 19 2017 17:55:40 GMT-0800 (PST)
  simpletime.getDayFromDate(date, -5);  // Mon Dec 26 2016 17:55:40 GMT-0800 (PST)
  simpletime.getDayFromDate(date, -50); // Fri Nov 11 2016 17:55:40 GMT-0800 (PST)
  ```

 * **getDayFromTodayDate ( _optNum_ )**

  returns a Date object with given number of days added to now's new Date()

  ex,

  ```javascript
  simpletime.getDayFromTodayDate(5);   // Thu Jan 05 2017 17:55:40 GMT-0800 (PST)
  simpletime.getDayFromTodayDate(50);  // Sun Feb 19 2017 17:55:40 GMT-0800 (PST)
  simpletime.getDayFromTodayDate(-5);  // Mon Dec 26 2016 17:55:40 GMT-0800 (PST)
  simpletime.getDayFromTodayDate(-50); // Fri Nov 11 2016 17:55:40 GMT-0800 (PST)
  ```
   
 * **getMonthFromDate ( _dateObj_,  _optNum_ )**

  returns a Date object with given number of months added

  ex,

  ```javascript
  var date = new Date('Sat Dec 31 2016 17:43:20 GMT-0800 (PST)');
    
  simpletime.getMonthFromDate(date, 5);   // Wed May 31 2017 17:58:55 GMT-0700 (PDT)
  simpletime.getMonthFromDate(date, 50);  // Sun Feb 28 2021 17:58:55 GMT-0800 (PST)
  simpletime.getMonthFromDate(date, -5);  // Sun Jul 31 2016 17:58:55 GMT-0700 (PDT)
  simpletime.getMonthFromDate(date, -50); // Wed Oct 31 2012 17:58:55 GMT-0700 (PDT)
  ```

 * **getMonthFromTodayDate ( _optNum_ )**

  returns a Date object with given number of months added to now's Date.now()

  ex,

  ```javascript
  simpletime.getMonthFromTodayDate(5);   // Wed May 31 2017 17:58:55 GMT-0700 (PDT)
  simpletime.getMonthFromTodayDate(50);  // Sun Feb 28 2021 17:58:55 GMT-0800 (PST)
  simpletime.getMonthFromTodayDate(-5);  // Sun Jul 31 2016 17:58:55 GMT-0700 (PDT)
  simpletime.getMonthFromTodayDate(-50); // Wed Oct 31 2012 17:58:55 GMT-0700 (PDT)
  ```
   
 * **getYearFromDate ( _optNum_ )**

  returns a Date object with given number of years added

  ex,

  ```javascript
  var date = new Date('Sat Dec 31 2016 17:43:20 GMT-0800 (PST)');
    
  simpletime.getYearFromDate(date, 5);   // Fri Dec 31 2021 18:07:54 GMT-0800 (PST)
  simpletime.getYearFromDate(date, 50);  // Fri Dec 31 2066 18:07:54 GMT-0800 (PST)
  simpletime.getYearFromDate(date, -5);  // Sat Dec 31 2011 18:07:54 GMT-0800 (PST)
  simpletime.getYearFromDate(date, -50); // Sat Dec 31 1966 18:07:54 GMT-0800 (PST)
  ```

 * **getYearFromTodayDate ( _optNum_ )**

  returns a Date object with given number of years added to now's Date.now()

  ex,

  ```javascript
  simpletime.getYearFromTodayDate(5);   // Fri Dec 31 2021 18:07:54 GMT-0800 (PST)
  simpletime.getYearFromTodayDate(50);  // Fri Dec 31 2066 18:07:54 GMT-0800 (PST)
  simpletime.getYearFromTodayDate(-5);  // Sat Dec 31 2011 18:07:54 GMT-0800 (PST)
  simpletime.getYearFromTodayDate(-50); // Sat Dec 31 1966 18:07:54 GMT-0800 (PST)
  ```
   
 * **getDaysInMonth ( _yearNum_, monthNum )**

  return the number of days found in the give month for the given year

  ex,

  ```javascript
  simpletime.getDaysInMonth(2015, 2); // 28
  simpletime.getDaysInMonth(2014, 2); // 28
  simpletime.getDaysInMonth(2013, 2); // 28
  simpletime.getDaysInMonth(2012, 2); // 29
  ```

 * **getMFittedYMDNumArr ( _YMDNumArr_ )**

  return a YMDNumArr with the month value 'fitted' to fall within the range of 1 and 12.

  ex,

  ```javascript
  simpletime.getMFittedYMDNumArr([2015, 2, 2]);  // [2015, 2, 2]
  simpletime.getMFittedYMDNumArr([2015, 0, 2]);  // [2015, 1, 2]
  simpletime.getMFittedYMDNumArr([2015, 13, 2]); // [2015, 12, 2]
  ```
   
 * **getDFittedYMDNumArr ( _YMDNumArr_ )**

  return a YMDNumArr with the day value 'fitted' to fall within the range of days in the given month and year.

  ex,

  ```javascript
  simpletime.getDFittedYMDNumArr([2015, 2, 2]);  // [2015, 2, 2]
  simpletime.getDFittedYMDNumArr([2015, 2, -4]); // [2015, 2, 1]
  simpletime.getDFittedYMDNumArr([2015, 2, 35]); // [2015, 2, 28]
  simpletime.getDFittedYMDNumArr([2012, 2, 35]); // [2014, 2, 29]
  ```

 * **getTimeBgnMonth ( _dateObj_ )**

  return a date from given dateObj, set to day 1, hour 0, minute 0, second 0, millisecond 0

  ex,

  ```javascript
  simpletime.getTimeBgnMonth(new Date('Sat Dec 31 2016 17:43:20 GMT-0800 (PST)')) 
  // Thu Dec 01 2016 00:00:00 GMT-0800 (PST)
  ```

 * **getTimeEndMonth ( _dateObj_ )**

  return a date from given dateObj, set to day last, hour 23, minute 59, second 59, millisecond 999

  ex,

  ```javascript
  simpletime.getTimeEndMonth(new Date('Sat Dec 31 2016 17:43:20 GMT-0800 (PST)')) 
  // Sat Dec 31 2016 23:59:59 GMT-0800 (PST)
  ```

 * **getTimeBgnDay ( _dateObj_ )**

  return a date from given dateObj, set to hour 0, minute 0, second 0, millisecond 0

  ex,

  ```javascript
  simpletime.getTimeBgnDay(new Date('Sat Dec 31 2016 17:43:20 GMT-0800 (PST)')) 
  // Sat Dec 31 2016 00:00:00 GMT-0800 (PST)
  ```

 * **getTimeEndDay ( _dateObj_ )**

  return a date from given dateObj, set to hour 23, minute 0, second 0, millisecond 0

  ex,

  ```javascript
  simpletime.getTimeEndDay(new Date('Sat Dec 31 2016 17:43:20 GMT-0800 (PST)'))
  // Sat Dec 31 2016 23:59:59 GMT-0800 (PST)
  ```

 * **isDateBeforeDate ( _dateObj_, _dateObj_ )**

  return a boolean value, is the date object before given date?

  ex,

  ```javascript
  simpletime.isDateBeforeDate(
    new Date('Sat Dec 31 2016 17:43:20 GMT-0800 (PST)'),
    new Date('Sat Dec 31 2016 6:43:20 GMT-0800 (PST)')
  ) 
  // false
  ```

 * **isDateBeforeToday ( _dateObj_ )**
 
  return a boolean value, is the date object before date.now()?

  ex,

  ```javascript
  Date.now(); // Sat Dec 31 2016 17:43:20 GMT-0800 (PST)
  simpletime.isDateBeforeToday(
    new Date('Sat Dec 31 2016 6:43:20 GMT-0800 (PST)')
  ) 
  //false
  ```

 * **parseISO8601 ( _str_ )**

  return a date object from a simple ISO formatted string date, format yyyy.mm.dd, yyyy/mm/dd, or yyyy-mm-dd

  ex,

  ```javascript
  simpletime.parseISO8601('2016/12/31');
  // Sat Dec 31 2016 6:43:20 GMT-0800 (PST) 
  ```

 * **parseUSEndian ( _str_ )**

  return a date object from a simple endian formatted string date, format mm.dd.yyyy, mm/dd/yyyy, or mm-dd-yyyy

  ex,

  ```javascript
  simpletime.parseISO8601('12/31/2016');
  // Sat Dec 31 2016 6:43:20 GMT-0800 (PST) 
  ```

 * **yieldRangeMonthly ( _bgnDateObj_, _endDateObj_,  _fn_ )**

  return a monthly array of dates within the range of bgnDate and endDate. An optional filter function may be provided as the third parameter.

  ex,

  ```javascript
  var bgndate = new Date('Sat Dec 5 2015 17:43:20 GMT-0800 (PST)'),
      enddate = new Date('Sat Dec 31 2016 17:43:20 GMT-0800 (PST)');
    
  simpletime.yieldRangeMonthly(bgndate, enddate);
  // [ Sat Dec 05 2015 17:43:20 GMT-0800 (PST),
  //   Tue Jan 05 2016 19:16:57 GMT-0800 (PST),
  //   Fri Feb 05 2016 19:16:57 GMT-0800 (PST),
  //   Sat Mar 05 2016 19:16:57 GMT-0800 (PST),
  //   Tue Apr 05 2016 19:16:57 GMT-0700 (PDT),
  //   Thu May 05 2016 19:16:57 GMT-0700 (PDT),
  //   Sun Jun 05 2016 19:16:57 GMT-0700 (PDT),
  //   Tue Jul 05 2016 19:16:57 GMT-0700 (PDT),
  //   Fri Aug 05 2016 19:16:57 GMT-0700 (PDT),
  //   Mon Sep 05 2016 19:16:57 GMT-0700 (PDT),
  //   Wed Oct 05 2016 19:16:57 GMT-0700 (PDT),
  //   Sat Nov 05 2016 19:16:57 GMT-0700 (PDT),
  //   Mon Dec 05 2016 19:16:57 GMT-0800 (PST) ]
  ```

 * **yieldRangeDaily ( _bgnDateObj_, _endDateObj_,  _fn_ )**

  return a daily array of dates within the range of bgnDate and endDate. An optional filter function may be provided as the third parameter.

  ex,

  ```javascript
  var bgndate = new Date('Sat Dec 23 2016 17:43:20 GMT-0800 (PST)'),
      enddate = new Date('Sat Dec 31 2016 17:43:20 GMT-0800 (PST)');
  
  simpletime.yieldRangeDaily(bgndate, enddate);
  // [ Fri Dec 23 2016 17:43:20 GMT-0800 (PST),
  //   Sat Dec 24 2016 19:19:20 GMT-0800 (PST),
  //   Sun Dec 25 2016 19:19:20 GMT-0800 (PST),
  //   Mon Dec 26 2016 19:19:20 GMT-0800 (PST),
  //   Tue Dec 27 2016 19:19:20 GMT-0800 (PST),
  //   Wed Dec 28 2016 19:19:20 GMT-0800 (PST),
  //   Thu Dec 29 2016 19:19:20 GMT-0800 (PST),
  //   Fri Dec 30 2016 19:19:20 GMT-0800 (PST) ]
  ```

 * **applyFormatDate ( _dateObj_ ,  _formatStr_ )**

  return a date that is formatted according to the given [unicode][3] formatStr

  ex,

  ```javascript
  simpletime.applyFormatDate(
    new Date('Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)'),
    'MMMM d, y h:mm:ss a z'
  );
  // 'April 5, 2013 9:23:41 pm 420'
  ```
   
 * **getDateAsISO ( _dateObj_ )**
   
  return a simplified ISO formatted date from a date object (yyyy/mm/dd)

  ex,

  ```javascript
  simpletime.getDateAsISO(new Date('Sat Dec 23 2016 17:43:20 GMT-0800 (PST)'));
  // '2016/12/23'
  ```
 
 * **getDateAsUSEndian ( _dateObj_ )**
 
  return a simplified Endian formatted date from a date object (mm/dd/yyyy) 

  ex,

  ```javascript
  simpletime.getDateAsUSEndian(new Date('Sat Dec 23 2016 17:43:20 GMT-0800 (PST)'));
  // '12/23/2015'
  ```

 * **getElapsedTimeObj ( _bgnDateObj_,  _endDateObj_ )**

  return an object whose properties define the elapsed time between date objects

  ex,

  ```javascript
  simpletime.getElapsedTimeObj(
    new Date('Sun Apr 07 2013 18:08:45 GMT-0700 (PDT)'),
    new Date('Sun Apr 07 2013 23:59:59 GMT-0700 (PDT)')
  )
  // { ms: 0, sec: 14, min: 51, hour: 5, day: 0 }
  ```

 * **getElapsedTimeFormatted ( _bgnDateObj_,  _endDateObj_ )**

  return a string of the elapsed time between date objects

  ex,

  ```javascript
  simpletime.getElapsedTimeFormatted(
    new Date('Sun Apr 07 2013 18:08:45 GMT-0700 (PDT)'),
    new Date('Sun Apr 07 2013 23:59:59 GMT-0700 (PDT)')
  )
  // 051:014:0 (mm:ss:ms)
  ```
   
 * **isDatesInRange ( _dateObj1_, _dateObj2_,  _range_ )**
   
  return true if given dates fall within the same range, specified as "month", "year" or "day"

  ex,

  ```javascript
  simpletime.isDatesInRange(
    new Date('Sun Apr 07 2013 18:08:45 GMT-0700 (PDT)'),
    new Date('Sun Apr 07 2013 23:59:59 GMT-0700 (PDT)'),
    'day'
  )
  // true
  simpletime.isDatesInRange(
    new Date('Sun Apr 07 2013 18:08:45 GMT-0700 (PDT)'),
    new Date('Sun Apr 08 2013 23:59:59 GMT-0700 (PDT)'),
    'day'
  )
  // false
  ```

 * **extractDateFormatted ( _formattedDateStr_,  _formatStr_ )**

  return a date object that is produced from formattedDateStr and the given formatStr

  ex,

  ```javascript
  simpletime.extractDateFormatted(
    'April 5, 2013 9:23:41 pm 420',
    'MMMM d, y h:mm:ss a z'
  )
  // Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  ```


[3]: http://cldr.unicode.org/translation/date-time        "unicode"
[7]: https://raw.githubusercontent.com/iambumblehead/es5classic/master/es5classic_120x120.png


![scrounge](https://github.com/iambumblehead/scroungejs/raw/master/img/hand.png)[![es5 classic][7]][7]

(The MIT License)

Copyright (c) 2013,2014,2015,2016 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
