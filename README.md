simpleTime
==========
**(c)[Bumblehead][0], 2013** [MIT-license](#license)  

### OVERVIEW:

simpletime provides methods for manipulating dates and converting dates to and from unicode format. simpletime does not provide internationalized dates -use [worldtime][1] for that.

what's good about this script:

  - format and unformat dates using unicode [forms][2]
  - create and use `YMDArr` objects to simplify time manipulation
  - does not depend on a library

[0]: http://www.bumblehead.com                            "bumblehead"
[1]: http://github.com/iambumblehead/worldtime            "worldtime"
[2]: http://cldr.unicode.org/translation/date-time        "unicode"

---------------------------------------------------------
#### <a id="install"></a>INSTALL:

simpleTime may be downloaded directly or installed through `npm`.

 * **npm**   

 ```bash
 $ npm install simpleTime
 ```

 * **Direct Download**
 
 ```bash  
 $ git clone https://github.com/iambumblehead/simpleTime.git
 ```

---------------------------------------------------------
#### <a id="test"></a>TEST:

 to run tests, use `npm test` from a shell.

 ```bash
 $ npm test
 ```

---------------------------------------------------------

#### <a id="get-started">GET STARTED:

 > *javascript file*

 > ```javascript
   var SimpleTime = require('simpleTime'), t;
   t = SimpleTime.getYMDArrDate(['2013', '4', '4']);
   t = SimpleTime.getDayFromDate(t, 4);
   console.log(t.getDate()); // 8
   ```

---------------------------------------------------------

#### <a id="methods">METHODS:


 - **isDateObj ( _dateObj_ )**  
   boolean, is the given date object a valid date object?
 
 - **getDateYNum ( _dateObj_ )**  
   return the year number from the date object  
   ex return values: 2013, 8, 488       
   
 - **getDateYStr ( _dateObj_ )**  
   return the year string from the date object  
   ex return values: '2013', '0008', '0488'

 - **getDateMNum ( _dateObj_ )**  
   return the month number from the date object  
   ex return values: 12, 10, 7, 4       
   
 - **getDateMStr ( _dateObj_ )**  
   return the month string from the date object  
   ex return values: '12', '10', '07', '04'
   
 - **getDateDNum ( _dateObj_ )**  
   return the day number from the date object   
   ex return values: 12, 10, 7, 4, 30
   
 - **getDateDStr ( _dateObj_ )**  
   return the day string from the date object   
   ex return values: '12', '10', '07', '04', '30'
   
 - **getDateYMDNumArr ( _dateObj_ )**  
   return the date as array of numbers
   ex return value: [2013, 5, 5]
   
 - **getDateYMDStrArr ( _dateObj_ )**  
   return the date as array of strings
   ex return value: ['2013', '05', '05']   
   
 - **getYMDArrDate ( _ymdArr_ )**  
   return the array of numbers (or strings numbers) as a date object

 - **getMinFromDate ( _dateObj_,  _optNum_ )**  
    return a new date object created from the given date object, with given number of minutes added. number may be negative so that the returned date will be in the past.  

   optNum: +2 goes forward two. -6 go back 6.

 - **getMinFromTodayDate ( _optNum_ )**  
   call getMinFromDate using new Date() and the given num value

 - **getDayFromDate ( _dateObj_,  _optNum_ )**  
    return a new date object created from the given date object, with given number of days added. number may be negative so that the returned date will be in the past.  

   optNum: +2 goes forward two. -6 go back 6.

 - **getDayFromTodayDate ( _optNum_ )**  
   call getDayFromDate using new Date() and the given num value
   
 - **getMonthFromDate ( _dateObj_,  _optNum_ )**  
    return a new date object created from the given date object, with given number of months added. number may be negative so that the returned date will be in the past.  

   optNum: +2 goes forward two. -6 go back 6.
   
 - **getMonthFromTodayDate ( _optNum_ )**  
   call getMonthFromDate using new Date() and the given num value
   
 - **getYearFromTodayDate ( _optNum_ )**  
   return a new date object created from the given date object, with given number of years added. number may be negative so that the returned date will be in the past.  

   optNum: +2 goes forward two. -6 go back 6.
   
 - **getYearFromDate ( _dateObj_,  _optNum_ )**  
   call getYearFromDate using new Date() and the given num value
   
 - **getDaysInMonth ( _mNum_ , _yNum_ )**
   return number of days that occur in the given month for the given year

 - **getMFittedYMDNumArr ( _YMDNumArr_ )**  
   this method will return a YMDNumArr with a value of 'M' fitted to fall within the range of 1 and 12. 

   if M > 12, M is redefined as 12
   if M < 1, M is redefined as 1
   
 - **getDFittedYMDNumArr ( _YMDNumArr_ )**  
   this method will return a YMDNumArr with a value of 'D' fitted to fall within the range of days that would exist for the month created by Y and M. 
 
   for example, [2013, 4, 32] would be returned as [2013, 4, 30]
    
 - **getTimeBgnMonth ( _dateObj_ )**  
   return a date that is defined from the given dateObj, redfined to day 1, hour 0, minute 0, second 0, millisecond 0.

 - **getTimeEndMonth ( _dateObj_ )**  
   return a date that is defined from the given dateObj, redfined to day 1, hour 23, minute 59, second 59, millisecond 999. 

 - **getFirstOfMonth ( _dateObj_ )**  
   return a date that is defined from the given dateObj, redfined to day 1.

 - **getLastOfMonth ( _dateObj_ )**  
   return a date that is defined from the given dateObj, redfined to the last day of the month.

 - **getTimeBgnDay ( _dateObj_ )**  
    return a date that is defined from the given dateObj, redfined to hour 0, minute 0, second 0, millisecond 0.

 - **getTimeEndDay ( _dateObj_ )**  
   return a date that is defined from the given dateObj, redfined to hour 23, minute 59, second 59, millisecond 999.  
 
 - **isBeforeToday ( _dateObj_ )**  
   return a boolean value, is the date object before date.now(), (regardless of hour, minute, second)?

 - **parseISO8601 ( _str_ )**  
   return a date object from a simple ISO formatted string date, in format yyyy.mm.dd, yyyy/mm/dd, or yyyy-mm-dd

 - **parseUSEndian ( _str_ )**  
   return a date object from a simple US endian formatted string date, in format  mm.dd.yyyy, mm/dd/yyyy, or mm-dd-yyyy

 - **yieldRangeMonthly ( _bgnDateObj_, _endDateObj_,  _fn_ )**  
   return a monthly array of dates within the range of bgnDate and endDate. An optional filter function may be provided as the third parameter.

   bgnDate will be the first element in the returned array

 - **yieldRangeDaily ( _bgnDateObj_, _endDateObj_,  _fn_ )**  
   return a daily array of dates within the range of bgnDate and endDate. An optional filter function may be provided as the third parameter.

   bgnDate will be the first element in the returned array 

 - **applyFormatDate ( _dateObj_ ,  _format_ )**  
   return a date that is formatted according to the given [unicode][3] formatStr

   using this date object, new Date(1365222221485), each of the following formats would return a result as shown:

   ```javascript
   // Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
   var date = new Date(1365222221485);
   var dateFormatLong = "MMMM d, y h:mm:ss a z";
   console.log(SimpleTime.applyFormatDate(date, dateFormatLong));
   // 'April 5, 2013 9:23:41 pm 420'
   ```
   
 - **getDateAsISO ( _dateObj_ )**  
   return a simplified ISO formatted date from a date object (yyyy/mm/dd)
 
 - **getDateAsUSEndian ( _dateObj_ )**  
   return a simplified ISO formatted date from a date object (mm/dd/yyyy) 
   
 - **getElapsedTime ( _bgnDateObj_,  _endDateObj_ )**  
   return an object whose properties define the elapsed time between bgnDate and endDate
   
   ```javascript
   // Sun Apr 07 2013 18:08:45 GMT-0700 (PDT)
   var oldDate = new Date(1365383325444);
   // Sun Apr 07 2013 23:59:59 GMT-0700 (PDT)
   var newDate = new Date(1365404399998);   
   console.log(SimpleTime.getElapsedTime(oldDate, newDate));    
   // { ms : 21074554,  
   //   sec : 21074,  
   //   min : 351, 
   //   hour : 5, 
   //   day : 0 
   // }
   ```

 - **getElapsedTimeFormatted ( _bgnDateObj_,  _endDateObj_ )**  
    return a string composed of the elapsed time between bgnDate and endDate: _min_:_sec_:_ms_ (mm:ss:ms)`
   
 - **isDatesInRange ( _dateObj1_, _dateObj2_,  _range_ )**  
   return true if given dates fall within the same range specified by range

   type is "month", "year" or "day"

   ```javascript
   // Sun Apr 07 2013 18:08:45 GMT-0700 (PDT)
   var oldDate = new Date(1365383325444);
   // Sun Apr 07 2013 23:59:59 GMT-0700 (PDT)
   var newDate = new Date(1365404399998);   
   console.log(SimpleTime.isDatesInRange(oldDate, newDate, 'day')); 
   // true
   ```

 - **extractDateFormatted ( _formattedDateStr_,  _formatStr_ )**  
   return a date object that is produced from formattedDateStr and the given formatStr

   ```javascript
   var formatStr = 'MMMM d, y h:mm:ss a z', s;
       formattedDateStr = 'April 5, 2013 9:23:41 pm 420'; 
   s = SimpleTime.extractDateFormatted(formattedDateStr, formatStr);       
   console.log(s); // Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
   ```
   
[3]: http://cldr.unicode.org/translation/date-time        "unicode"   

---------------------------------------------------------

#### <a id="license">License:

(The MIT License)

Copyright (c) 2013 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
