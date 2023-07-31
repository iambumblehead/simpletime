// Filename: simpletime.spec.js  
// Timestamp: 2016.01.07-22:33:04 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

import test from 'node:test'
import assert from 'node:assert/strict'
import timezone_mock from 'timezone-mock'
import simpletime from './simpletime.js'

timezone_mock.register('US/Pacific');

test("isDateObj, should return false if input is null", () => {
  assert.strictEqual(simpletime.isDateObj(null), false);
});

test("isDateObj, should return false if input is undefined", () => {
  assert.strictEqual(simpletime.isDateObj(null), false);
});

test("isDateObj, should return false if input is {}", () => {
  assert.strictEqual(simpletime.isDateObj({}), false);
});

test("isDateObj, should return true if input is a valid date object", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  var date = new Date(1365222221485);

  assert.strictEqual(simpletime.isDateObj(date), true);
});

test("getDateYStr, should return the correct year number", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  var date = new Date(1365222221485);

  assert.strictEqual(simpletime.getDateYStr(date), '2013');
});

test("getDateMStr, should return the correct month number", () => {
  var date = new Date(1365222221485);

  assert.strictEqual(simpletime.getDateMStr(date), '04');
});

test("getDateDStr, should return the correct day number", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  var date = new Date(1365222221485);

  assert.strictEqual(simpletime.getDateDStr(date), '05');
});

test("getDateYMDStrArr, should return the correct day number", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getDateYMDStrArr(date);

  assert.deepStrictEqual(result, [ '2013', '04', '05' ]);
});

test("getDateYMDNumArr, should return the correct day number", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getDateYMDNumArr(date);

  assert.deepStrictEqual(result, [ 2013, 4, 5 ]);
});

// eslint-disable-next-line max-len
test("getDateYMDArr, should return the correct date object from YMDStrArr", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getYMDArrDate([ 2013, 4, 5 ]);
  const resultExpected = [ 2013, 4, 5 ];

  assert.deepStrictEqual(result &&
     result.getFullYear() === date.getFullYear() && 
     result.getMonth() === date.getMonth() &&
     result.getDate() === date.getDate(), true);
});

// eslint-disable-next-line max-len
test("getMinFromDate, should return a new date one minute ahead of the given date object", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getMinFromDate(date, 1);

  assert.strictEqual(result.getMinutes(), date.getMinutes() + 1);
});

// eslint-disable-next-line max-len
test("getMFittedYMDNumArr, should return a new YMDNumArr with a correct month greater than 12", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getMFittedYMDNumArr([ 2013, 13, 3 ]);

  assert.strictEqual(result[1], 12);
});  

// eslint-disable-next-line max-len
test("getMFittedYMDNumArr, should return a new YMDNumArr with a correct month less than 1", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getMFittedYMDNumArr([ 2013, 0, 3 ]);

  assert.strictEqual(result[1], 1);
});  

// eslint-disable-next-line max-len
test("getMFittedYMDNumArr, should return a new YMDNumArr with same month if 1 <= month <= 12", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getMFittedYMDNumArr([ 2013, 4, 3 ]);

  assert.strictEqual(result[1], 4);
});  

// eslint-disable-next-line max-len
test("getDFittedYMDNumArr, should return a new YMDNumArr with a correct day greater than possible days in month", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getDFittedYMDNumArr([ 2013, 4, 33 ]);
  
  assert.strictEqual(result[2], 30);
});  

// eslint-disable-next-line max-len
test("getDFittedYMDNumArr, should return a new YMDNumArr with a correct day less than 1", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getDFittedYMDNumArr([ 2013, 4, 0 ]);

  assert.strictEqual(result[2], 1);
});  

// eslint-disable-next-line max-len
test("getDFittedYMDNumArr, should return a new YMDNumArr with same day if 1 <= month <= possible days of month at year", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getDFittedYMDNumArr([ 2013, 4, 3 ]);

  assert.strictEqual(result[2], 3);
});  

test("getDaysInMonth, should return `31` for y = 2013, m = 1", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getDaysInMonth(2013, 1);

  assert.strictEqual(result, 31);
});  

test("getDaysInMonth, should return `28` for y = 2013, m = 2", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getDaysInMonth(2013, 2);

  assert.strictEqual(result, 28);
});  

test("getDaysInMonth, should return `31` for y = 2013, m = 3", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getDaysInMonth(2013, 3);

  assert.strictEqual(result, 31);
});  

test("getDaysInMonth, should return `30` for y = 2013, m = 4", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getDaysInMonth(2013, 4);

  assert.strictEqual(result, 30);
});

// eslint-disable-next-line max-len
test("getDayFromDate, should return a new date one day ahead of the given date object", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getDayFromDate(date, 1);

  assert.strictEqual(result.getDate(), date.getDate() + 1);
});

// eslint-disable-next-line max-len
test("getMonthFromDate, should return a new date one month ahead of the given date object", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getMonthFromDate(date, 1);

  assert.strictEqual(result.getMonth(), date.getMonth() + 1);
});

// eslint-disable-next-line max-len
test("getYearFromDate, should return a new date one year ahead of the given date object", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getYearFromDate(date, 1);

  assert.strictEqual(result.getFullYear(), date.getFullYear() + 1);
});

// eslint-disable-next-line max-len
test("isDateBeforeDate, should return true for a date that is before a date", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const oldDate = new Date(1365222221485);
  //Sat Apr 06 2013 22:55:14 GMT-0700 (PDT)
  const newDate = new Date(1365314114343);

  assert.strictEqual(simpletime.isDateBeforeDate(oldDate, newDate), true);
});

// eslint-disable-next-line max-len
test("isDateBeforeDate, should return false for a date that is before a date", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const oldDate = new Date(1365222221485);
  //Sat Apr 06 2013 22:55:14 GMT-0700 (PDT)
  const newDate = new Date(1365314114343);

  assert.strictEqual(simpletime.isDateBeforeDate(newDate, oldDate), false);
});

// eslint-disable-next-line max-len
test("getTimeBgnMonth, should return true for a date defined to the beginning of the month", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getTimeBgnMonth(date);

  assert.strictEqual(result &&
          result.getFullYear() === date.getFullYear() && 
          result.getMonth() === date.getMonth() &&
          result.getDate() === 1 &&

          result.getHours() === 0 &&          
          result.getMinutes() === 0 &&          
          result.getSeconds() === 0 &&          
          result.getMilliseconds() === 0 , true);
});

// eslint-disable-next-line max-len
test("getTimeEndMonth, should return true for a date defined to the end of the month", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getTimeEndMonth(date);

  assert.strictEqual(result &&
          result.getFullYear() === date.getFullYear() && 
          result.getMonth() === date.getMonth() &&
          result.getDate() === simpletime.getLastOfMonth(date).getDate() &&

          result.getHours() === 23 &&          
          result.getMinutes() === 59 &&          
          result.getSeconds() === 59 &&          
          result.getMilliseconds() === 998 , true);
});

// eslint-disable-next-line max-len
test("getTimeBgnDay, should return true for a date defined to the beginning of the day", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getTimeBgnDay(date);

  assert.strictEqual(result &&
          result.getFullYear() === date.getFullYear() && 
          result.getMonth() === date.getMonth() &&
          result.getDate() === date.getDate() &&

          result.getHours() === 0 &&          
          result.getMinutes() === 0 &&          
          result.getSeconds() === 0 &&          
          result.getMilliseconds() === 0 , true);
});

// eslint-disable-next-line max-len
test("getTimeBgnDay, should return a date defined to the beginning of the day", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.getTimeBgnDay(date);

  assert.strictEqual(result &&
          result.getHours() === 0 &&          
          result.getMinutes() === 0 &&          
          result.getSeconds() === 0 &&          
          result.getMilliseconds() === 0 , true);
});

// eslint-disable-next-line max-len
test("parseISO8601, should return a date from a simplified ISO formatted date, `2013/12/20`", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.parseISO8601('2013/12/20');

  assert.strictEqual(result &&
          result.getFullYear() === 2013 && 
          result.getMonth() === 11 &&
          result.getDate() === 20 , true);
});

// eslint-disable-next-line max-len
test("parseUSEndian, should return a date from a simplified US Endian formatted date, `12/20/2013`", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const result = simpletime.parseUSEndian('12/20/2013');

  assert.strictEqual(result &&
          result.getFullYear() === 2013 && 
          result.getMonth() === 11 &&
          result.getDate() === 20 , true);
});

// eslint-disable-next-line max-len
test("getDateAsISO, should return a simplified ISO formatted date from a date, `2013/4/5`", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);

  assert.strictEqual(simpletime.getDateAsISO(date) , '2013/04/05');
});

// eslint-disable-next-line max-len
test("getDateUSEndian, should return a simplified US Endian formatted date from a date, `4/5/2013`", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);

  assert.strictEqual(simpletime.getDateAsUSEndian(date) , '04/05/2013');
});

// first date will be 3/3/2010
// eslint-disable-next-line max-len
test("yieldRangeMonthly, should return 38 dates twixt `3/3/2010` and `4/5/2013`", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  //Wed Mar 03 2010 17:32:44 GMT-0800 (PST)
  const oldDate = new Date(1267666364512);
  const result = simpletime.yieldRangeMonthly(oldDate, date);

  assert.strictEqual(result && result.length === 38 , true);
});

// first date will be 3/3/2010
// eslint-disable-next-line max-len
test("yieldRangeDaily, should return 3 dates twixt `4/5/2013, 21:23` and `4/7/2013, 17:40`", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const oldDate = new Date(1365222221485);
  //Sun Apr 07 2013 17:40:17 GMT-0700 (PDT)
  const newDate = new Date(1365381617189);
  const result = simpletime.yieldRangeDaily(oldDate, newDate);

  assert.deepStrictEqual(result.map(r => r.getTime()), [
    1365222221485, // Date 2013-04-06 04:23:41 485ms UTC
    1365231600000, // Date 2013-04-06 07:00:00 UTC
    1365318000000 // Date 2013-04-07 07:00:00 UTC
  ]);
});

// first date will be 3/3/2010
// eslint-disable-next-line max-len
test("yieldRangeDaily, should return 4 dates twixt `4/5/2013, 21:23` and `4/7/2013, 23:59`", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const oldDate = new Date(1365222221485);
  //Sun Apr 07 2013 23:59:59 GMT-0700 (PDT)
  const newDate = new Date(1365404399998);
  const result = simpletime.yieldRangeDaily(oldDate, newDate);
  
  assert.deepStrictEqual(result.map(r => r.getTime()), [
    1365222221485, // Date 2013-04-06 04:23:41 485ms UTC
    1365231600000, // Date 2013-04-06 07:00:00 UTC,
    1365318000000 // Date 2013-04-07 07:00:00 UTC
  ]);
  
  assert.strictEqual(result.length , 3);
});

// eslint-disable-next-line max-len
test("applyFormatDate, should return a correctly formatted date from date object, full", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const dateFormatLong = "MMMM d, y h:mm:ss a z";

  assert.strictEqual(
    simpletime.applyFormatDate(date, dateFormatLong),
    'April 5, 2013 9:23:41 pm 420');
});

// eslint-disable-next-line max-len
test("applyFormatDate, should return a correctly formatted date from date object, medium", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const dateFormatMedium = "MMM d, y h:mm:ss a";

  assert.strictEqual(
    simpletime.applyFormatDate(date, dateFormatMedium),
    'Apr 5, 2013 9:23:41 pm');
});

// eslint-disable-next-line max-len
test("applyFormatDate, should return a correctly formatted date from date object, short", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const dateFormatShort = "M/d/yyyy h:mm a";
  
  assert.strictEqual(
    simpletime.applyFormatDate(date, dateFormatShort),
    '4/5/2013 9:23 pm');
});

// eslint-disable-next-line max-len
test("applyFormatDate, should return a correctly formatted date from date object, `dd-MM-yy`", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const dateFormatShort = "dd-MM-yy";
  
  assert.strictEqual(
    simpletime.applyFormatDate(date, dateFormatShort),
    '05-04-13');
});

// eslint-disable-next-line max-len
test("applyFormatDate, should return a correctly formatted date from date object, `M/d/yy`", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const dateFormatShort = "M/d/yy";
  
  assert.strictEqual(
    simpletime.applyFormatDate(date, dateFormatShort), '4/5/13');
});

// eslint-disable-next-line max-len
test("applyFormatDate, should return a correctly formatted date from date object, `dd-MM-yyyy`", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const dateFormatShort = "dd-MM-yyyy";
  
  assert.strictEqual(
    simpletime.applyFormatDate(date, dateFormatShort), '05-04-2013');
});

// eslint-disable-next-line max-len
test("applyFormatDate, should return a correctly formatted date from date object, `MMM d, y`", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const dateFormatShort = "MMM d, y";
  
  assert.strictEqual(
    simpletime.applyFormatDate(date, dateFormatShort), 'Apr 5, 2013');
});

// eslint-disable-next-line max-len
test("applyFormatDate, should return a correctly formatted date from date object, `MMMM d, y`", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const dateFormatShort = "MMMM d, y";
  
  assert.strictEqual(
    simpletime.applyFormatDate(date, dateFormatShort), 'April 5, 2013');
});

// eslint-disable-next-line max-len
test("applyFormatDate, should return a correctly formatted date from date object, `5 'de' April 'de' 2013`", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const dateFormatShort = "d 'de' MMMM 'de' y";
  
  assert.strictEqual(
    simpletime.applyFormatDate(date, dateFormatShort),
    "5 'de' April 'de' 2013");
});

// eslint-disable-next-line max-len
test("applyFormatDate, should return a correctly formatted date from date object, `EEEE, d 'de' MMMM 'de' y`", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const dateFormatShort = "EEEE, d 'de' MMMM 'de' y";
  
  assert.strictEqual(
    simpletime.applyFormatDate(date, dateFormatShort),
    "Friday, 5 'de' April 'de' 2013");
});

// eslint-disable-next-line max-len
test("applyFormatDate, should return a correctly formatted date from date object, `EEEE, MMMM d, y`", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221485);
  const dateFormatShort = "EEEE, MMMM d, y";
  
  assert.strictEqual(
    simpletime.applyFormatDate(date, dateFormatShort), "Friday, April 5, 2013");
});

// eslint-disable-next-line max-len
test("getElapsedTime, should return an object whose properties describe elapsed time, ", () => {
  //Sun Apr 07 2013 18:08:45 GMT-0700 (PDT)
  const oldDate = new Date(1365383325444);
  //Sun Apr 07 2013 23:59:59 GMT-0700 (PDT)
  const newDate = new Date(1365404399998);
  const result = simpletime.getElapsedTimeObj(oldDate, newDate);

  assert.strictEqual(result.ms === 554 && 
          result.sec === 14 &&
          result.min === 51 &&
          result.hour === 5 &&
          result.day === 0 , true);
});  

// eslint-disable-next-line max-len
test("isDatesInRange, should return true when dates are within the same day", () => {
  //Sun Apr 07 2013 18:08:45 GMT-0700 (PDT)
  const oldDate = new Date(1365383325444);
  //Sun Apr 07 2013 23:59:59 GMT-0700 (PDT)
  const newDate = new Date(1365404399998);  

  assert.strictEqual(simpletime.isDatesInRange(oldDate, newDate, 'day') , true);
});

// eslint-disable-next-line max-len
test("isDatesInRange, should return false when dates are not within the same day", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const oldDate = new Date(1365222221485);
  //Sun Apr 07 2013 23:59:59 GMT-0700 (PDT)
  const newDate = new Date(1365404399998);  

  assert.strictEqual(
    simpletime.isDatesInRange(oldDate, newDate, 'day') , false);
});

// eslint-disable-next-line max-len
test("isDatesInRange, should return true when dates are within the same month", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const oldDate = new Date(1365222221485);
  //Sun Apr 07 2013 23:59:59 GMT-0700 (PDT)
  const newDate = new Date(1365404399998);  

  assert.strictEqual(
    simpletime.isDatesInRange(oldDate, newDate, 'month') , true);
});

// eslint-disable-next-line max-len
test("isDatesInRange, should return false when dates are within the different month", () => {
  //Wed Mar 03 2010 17:32:44 GMT-0800 (PST)
  const oldDate = new Date(1267666364512);
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const newDate = new Date(1365222221485);

  assert.strictEqual(
    simpletime.isDatesInRange(oldDate, newDate, 'month') , false);
});

// eslint-disable-next-line max-len
test("isDatesInRange, should return true when dates are within the same year", () => {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const oldDate = new Date(1365222221485);
  //Sun Apr 07 2013 23:59:59 GMT-0700 (PDT)
  const newDate = new Date(1365404399998);  

  assert.strictEqual(
    simpletime.isDatesInRange(oldDate, newDate, 'year') , true);
});

// eslint-disable-next-line max-len
test("isDatesInRange, should return false when dates are not within the same year", () => {
  //Wed Mar 03 2010 17:32:44 GMT-0800 (PST)
  const oldDate = new Date(1267666364512);
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const newDate = new Date(1365222221485);

  assert.strictEqual(
    simpletime.isDatesInRange(oldDate, newDate, 'year') , false);
});

// eslint-disable-next-line max-len
test("extractDateFormatted, should return a correct date object form formatted date, full", () => {  
  const date = new Date(1365308621485);
  const dateFormatLong = "MMMM d, y h:mm:ss a z";
  const dateFormatted = 'April 6, 2013 9:23:41 pm 485';
  
  assert.strictEqual(
    simpletime.extractDateFormatted(dateFormatted, dateFormatLong).getTime(),
    date.getTime());
});

// eslint-disable-next-line max-len
test("extractDateFormatted, should return a correct date object form formatted date, medium", () => {  
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  const date = new Date(1365222221000);
  const dateFormatMedium = "MMM d, y h:mm:ss a";
  const dateFormatted = 'Apr 5, 2013 9:23:41 pm';

  assert.strictEqual(
    simpletime.extractDateFormatted(dateFormatted, dateFormatMedium).getTime(),
    date.getTime());
});
