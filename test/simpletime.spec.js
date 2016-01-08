// Filename: simpletime.spec.js  
// Timestamp: 2016.01.07-22:33:04 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var simpletime = require('../simpletime');


describe("simpletime.isDateObj", function () {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  var result, resultExpected;

  it("should return false if input is null", function () {
    result = simpletime.isDateObj(null);

    expect( result ).toBe( false );
  });

  it("should return false if input is undefined", function () {
    result = simpletime.isDateObj(null);

    expect( result ).toBe( false );
  });

  it("should return false if input is {}", function () {
    result = simpletime.isDateObj({});

    expect( result ).toBe( false );
  });

  it("should return true if input is a valid date object", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.isDateObj(date);

    expect( result ).toBe( true );
  });
});


describe("simpletime.getDateYStr", function () {
  var result, resultExpected;

  it("should return the correct year number", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getDateYStr(date);
    resultExpected = '2013';

    expect( result ).toBe( resultExpected );
  });
});

describe("simpletime.getDateMStr", function () {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  var result, resultExpected;

  it("should return the correct month number", function () {
    var date = new Date(1365222221485);

    result = simpletime.getDateMStr(date);
    resultExpected = '04';

    expect( result ).toBe( resultExpected );
  });
});

describe("simpletime.getDateDStr", function () {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  var result, resultExpected;

  it("should return the correct day number", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getDateDStr(date);
    resultExpected = '05';

    expect( result ).toBe( resultExpected );
  });
});



describe("simpletime.getDateYMDStrArr", function () {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  var result, resultExpected;

  it("should return the correct day number", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getDateYMDStrArr(date);

    expect( result &&
            result[0] === '2013' && 
            result[1] === '04' &&
            result[2] === '05' ).toBe( true );
  });
});

describe("simpletime.getDateYMDNumArr", function () {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  var result, resultExpected;

  it("should return the correct day number", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getDateYMDNumArr(date);

    expect( result &&
            result[0] === 2013 && 
            result[1] === 4 &&
            result[2] === 5 ).toBe( true );
  });
});


describe("simpletime.getDateYMDArrDate", function () {
  //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
  var result, resultExpected;

  it("should return the correct date object from YMDStrArr", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getYMDArrDate([2013, 4, 5]);
    resultExpected = [2013, 4, 5];

    expect( result &&
            result.getFullYear() === date.getFullYear() && 
            result.getMonth() === date.getMonth() &&
            result.getDate() === date.getDate() ).toBe( true );
  });
});

describe("simpletime.getMinFromDate", function () {
  var result, resultExpected;

  it("should return a new date one minute ahead of the given date object", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getMinFromDate(date, 1);

    expect(result.getMinutes(), date.getMinutes() + 1);
  });

});

describe("simpletime.getMFittedYMDNumArr", function () {
  var result, resultExpected;

  it("should return a new YMDNumArr with a correct month greater than 12", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getMFittedYMDNumArr([2013, 13, 3]);

    expect(result[1]).toBe( 12 );
  });  

  it("should return a new YMDNumArr with a correct month less than 1", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getMFittedYMDNumArr([2013, 0, 3]);

    expect(result[1]).toBe( 1 );
  });  

  it("should return a new YMDNumArr with same month if 1 <= month <= 12", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getMFittedYMDNumArr([2013, 4, 3]);

    expect(result[1]).toBe( 4 );
  });  

});

describe("simpletime.getDFittedYMDNumArr", function () {
  var result, resultExpected;

  it("should return a new YMDNumArr with a correct day greater than possible days in month", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getDFittedYMDNumArr([2013, 4, 33]);
    
    expect(result[2]).toBe( 30 );
  });  

  it("should return a new YMDNumArr with a correct day less than 1", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getDFittedYMDNumArr([2013, 4, 0]);

    expect(result[2]).toBe( 1 );
  });  

  it("should return a new YMDNumArr with same day if 1 <= month <= possible days of month at year", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getDFittedYMDNumArr([2013, 4, 3]);

    expect(result[2]).toBe( 3 );
  });  

});

describe("simpletime.getDaysInMonth", function () {
  var result; 

  it("should return `31` for y = 2013, m = 1", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);
    result = simpletime.getDaysInMonth(2013, 1);
    expect(result).toBe( 31 );
  });  

  it("should return `28` for y = 2013, m = 2", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);
    result = simpletime.getDaysInMonth(2013, 2);
    expect(result).toBe( 28 );
  });  

  it("should return `31` for y = 2013, m = 3", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);
    result = simpletime.getDaysInMonth(2013, 3);
    expect(result).toBe( 31 );
  });  

  it("should return `30` for y = 2013, m = 4", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);
    result = simpletime.getDaysInMonth(2013, 4);
    expect(result).toBe( 30 );
  });  
});

describe("simpletime.getDayFromDate", function () {
  var result, resultExpected;

  it("should return a new date one day ahead of the given date object", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getDayFromDate(date, 1);
    expect(result.getDate()).toBe( date.getDate() + 1 );
  });

});

describe("simpletime.getMonthFromDate", function () {
  var result, resultExpected;

  it("should return a new date one month ahead of the given date object", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getMonthFromDate(date, 1);

    expect(result.getMonth()).toBe( date.getMonth() + 1);
  });

});

describe("simpletime.getYearFromDate", function () {
  var result, resultExpected;

  it("should return a new date one year ahead of the given date object", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getYearFromDate(date, 1);

    expect(result.getFullYear(), date.getFullYear() + 1);
  });

});


describe("simpletime.isDateBeforeDate", function () {
  var result, resultExpected;

  it("should return true for a date that is before a date", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var oldDate = new Date(1365222221485);
    //Sat Apr 06 2013 22:55:14 GMT-0700 (PDT)
    var newDate = new Date(1365314114343);

    result = simpletime.isDateBeforeDate(oldDate, newDate);
    resultExpected = true;

    expect(result, resultExpected);
  });

  it("should return false for a date that is before a date", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var oldDate = new Date(1365222221485);
    //Sat Apr 06 2013 22:55:14 GMT-0700 (PDT)
    var newDate = new Date(1365314114343);

    result = simpletime.isDateBeforeDate(newDate, oldDate);
    resultExpected = false;

    expect(result, resultExpected);
  });

});

describe("simpletime.getTimeBgnMonth", function () {
  var result, resultExpected;

  it("should return true for a date defined to the beginning of the month", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getTimeBgnMonth(date);

    expect( result &&
            result.getFullYear() === date.getFullYear() && 
            result.getMonth() === date.getMonth() &&
            result.getDate() === 1 &&

            result.getHours() === 0 &&          
            result.getMinutes() === 0 &&          
            result.getSeconds() === 0 &&          
            result.getMilliseconds() === 0 ).toBe( true );
  });
});

describe("simpletime.getTimeEndMonth", function () {
  var result, resultExpected;

  it("should return true for a date defined to the end of the month", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getTimeEndMonth(date);


    expect( result &&
            result.getFullYear() === date.getFullYear() && 
            result.getMonth() === date.getMonth() &&
            result.getDate() === simpletime.getLastOfMonth(date).getDate() &&

            result.getHours() === 23 &&          
            result.getMinutes() === 59 &&          
            result.getSeconds() === 59 &&          
            result.getMilliseconds() === 998 ).toBe( true );
  });
});

describe("simpletime.getTimeBgnDay", function () {
  var result, resultExpected;

  it("should return true for a date defined to the beginning of the day", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getTimeBgnDay(date);

    expect( result &&
            result.getFullYear() === date.getFullYear() && 
            result.getMonth() === date.getMonth() &&
            result.getDate() === date.getDate() &&

            result.getHours() === 0 &&          
            result.getMinutes() === 0 &&          
            result.getSeconds() === 0 &&          
            result.getMilliseconds() === 0 ).toBe( true );
  });

  it("should return a date defined to the beginning of the day", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getTimeBgnDay(date);


    expect( result &&
            result.getHours() === 0 &&          
            result.getMinutes() === 0 &&          
            result.getSeconds() === 0 &&          
            result.getMilliseconds() === 0 ).toBe( true );
  });
});

describe("simpletime.parseISO8601", function () {
  var result, resultExpected;

  it("should return a date from a simplified ISO formatted date, `2013/12/20`", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.parseISO8601('2013/12/20');

    expect( result &&
            result.getFullYear() === 2013 && 
            result.getMonth() === 11 &&
            result.getDate() === 20 ).toBe( true );
  });
});

describe("simpletime.parseUSEndian", function () {
  var result, resultExpected;

  it("should return a date from a simplified US Endian formatted date, `12/20/2013`", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.parseUSEndian('12/20/2013');

    expect( result &&
            result.getFullYear() === 2013 && 
            result.getMonth() === 11 &&
            result.getDate() === 20 ).toBe( true );
  });
});

describe("simpletime.getDateAsISO", function () {
  var result, resultExpected;

  it("should return a simplified ISO formatted date from a date, `2013/4/5`", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getDateAsISO(date);

    expect( result ).toBe( '2013/04/05' );
  });
});

describe("simpletime.getDateUSEndian", function () {
  var result, resultExpected;

  it("should return a simplified US Endian formatted date from a date, `4/5/2013`", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);

    result = simpletime.getDateAsUSEndian(date);

    expect( result ).toBe( '04/05/2013' );
  });
});

describe("simpletime.yieldRangeMonthly", function () {
  var result, resultExpected;

  // first date will be 3/3/2010
  it("should return 38 dates twixt `3/3/2010` and `4/5/2013`", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);
    //Wed Mar 03 2010 17:32:44 GMT-0800 (PST)
    var oldDate = new Date(1267666364512);

    result = simpletime.yieldRangeMonthly(oldDate, date);
    expect( result && result.length === 38 ).toBe( true );
  });
});

describe("simpletime.yieldRangeDaily", function () {
  var result, resultExpected;


  // first date will be 3/3/2010
  it("should return 3 dates twixt `4/5/2013, 21:23` and `4/7/2013, 17:40`", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var oldDate = new Date(1365222221485);
    //Sun Apr 07 2013 17:40:17 GMT-0700 (PDT)
    var newDate = new Date(1365381617189);

    result = simpletime.yieldRangeDaily(oldDate, newDate);

    expect( result.length ).toBe( 2 );
  });

  // first date will be 3/3/2010
  it("should return 4 dates twixt `4/5/2013, 21:23` and `4/7/2013, 23:59`", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var oldDate = new Date(1365222221485);
    //Sun Apr 07 2013 23:59:59 GMT-0700 (PDT)
    var newDate = new Date(1365404399998);

    result = simpletime.yieldRangeDaily(oldDate, newDate);
    
    expect( result.length ).toBe( 3 );
  });

});


describe("simpletime.applyFormatDate", function () {
  var result, resultExpected;

  it("should return a correctly formatted date from date object, full", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);
    var dateFormatLong = "MMMM d, y h:mm:ss a z";

    result = simpletime.applyFormatDate(date, dateFormatLong);
    resultExpected = 'April 5, 2013 9:23:41 pm 420';
    expect( result ).toBe(resultExpected);
  });

  it("should return a correctly formatted date from date object, medium", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);
    var dateFormatMedium = "MMM d, y h:mm:ss a";

    result = simpletime.applyFormatDate(date, dateFormatMedium);
    resultExpected = 'Apr 5, 2013 9:23:41 pm';
    expect( result ).toBe( resultExpected );
  });

  it("should return a correctly formatted date from date object, short", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);
    var dateFormatShort = "M/d/yyyy h:mm a";
    
    result = simpletime.applyFormatDate(date, dateFormatShort);    
    resultExpected = '4/5/2013 9:23 pm';
    expect( result ).toBe( resultExpected );
  });

  it("should return a correctly formatted date from date object, `dd-MM-yy`", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);
    var dateFormatShort = "dd-MM-yy";
    
    result = simpletime.applyFormatDate(date, dateFormatShort);    
    resultExpected = '05-04-13';
    expect( result ).toBe( resultExpected );
  });

  it("should return a correctly formatted date from date object, `M/d/yy`", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);
    var dateFormatShort = "M/d/yy";
    
    result = simpletime.applyFormatDate(date, dateFormatShort);    
    resultExpected = '4/5/13';
    expect( result ).toBe( resultExpected );
  });

  it("should return a correctly formatted date from date object, `dd-MM-yyyy`", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);
    var dateFormatShort = "dd-MM-yyyy";
    
    result = simpletime.applyFormatDate(date, dateFormatShort);    
    resultExpected = '05-04-2013';
    expect( result ).toBe( resultExpected );
  });

  it("should return a correctly formatted date from date object, `MMM d, y`", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);
    var dateFormatShort = "MMM d, y";
    
    result = simpletime.applyFormatDate(date, dateFormatShort);    
    resultExpected = 'Apr 5, 2013';
    expect( result ).toBe( resultExpected );
  });

  it("should return a correctly formatted date from date object, `MMMM d, y`", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);
    var dateFormatShort = "MMMM d, y";
    
    result = simpletime.applyFormatDate(date, dateFormatShort);    
    resultExpected = 'April 5, 2013';
    expect( result ).toBe( resultExpected );
  });

  it("should return a correctly formatted date from date object, `5 'de' April 'de' 2013`", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);
    var dateFormatShort = "d 'de' MMMM 'de' y";
    
    result = simpletime.applyFormatDate(date, dateFormatShort);    
    resultExpected = "5 'de' April 'de' 2013";
    expect( result ).toBe( resultExpected );
  });

  it("should return a correctly formatted date from date object, `EEEE, d 'de' MMMM 'de' y`", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);
    var dateFormatShort = "EEEE, d 'de' MMMM 'de' y";
    
    result = simpletime.applyFormatDate(date, dateFormatShort);    
    resultExpected = "Friday, 5 'de' April 'de' 2013";
    expect( result ).toBe( resultExpected );
  });

  it("should return a correctly formatted date from date object, `EEEE, MMMM d, y`", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485);
    var dateFormatShort = "EEEE, MMMM d, y";
    
    result = simpletime.applyFormatDate(date, dateFormatShort);    
    resultExpected = "Friday, April 5, 2013";
    expect( result ).toBe( resultExpected );
  });
});

describe("simpletime.getElapsedTime", function () {
  var result, resultExpected;

  it("should return an object whose properties describe elapsed time, ", function () {
    //Sun Apr 07 2013 18:08:45 GMT-0700 (PDT)
    var oldDate = new Date(1365383325444);
    //Sun Apr 07 2013 23:59:59 GMT-0700 (PDT)
    var newDate = new Date(1365404399998);

    result = simpletime.getElapsedTimeObj(oldDate, newDate);

    expect( result.ms === 554 && 
            result.sec === 14 &&
            result.min === 51 &&
            result.hour === 5 &&
            result.day === 0 ).toBe( true );
  });  
});

describe("simpletime.isDatesInRange", function () {
  var result, resultExpected;

  
  it("should return true when dates are within the same day", function () {
    //Sun Apr 07 2013 18:08:45 GMT-0700 (PDT)
    var oldDate = new Date(1365383325444);
    //Sun Apr 07 2013 23:59:59 GMT-0700 (PDT)
    var newDate = new Date(1365404399998);  

    result = simpletime.isDatesInRange(oldDate, newDate, 'day');
    
    expect( result ).toBe( true );
  
  });

  it("should return false when dates are not within the same day", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var oldDate = new Date(1365222221485);
    //Sun Apr 07 2013 23:59:59 GMT-0700 (PDT)
    var newDate = new Date(1365404399998);  

    result = simpletime.isDatesInRange(oldDate, newDate, 'day');
      
    expect( result ).toBe( false );
  });

  it("should return true when dates are within the same month", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var oldDate = new Date(1365222221485);
    //Sun Apr 07 2013 23:59:59 GMT-0700 (PDT)
    var newDate = new Date(1365404399998);  

    result = simpletime.isDatesInRange(oldDate, newDate, 'month');
    
    expect( result ).toBe( true );
  });

  it("should return true when dates are within the same month", function () {
    //Wed Mar 03 2010 17:32:44 GMT-0800 (PST)
    var oldDate = new Date(1267666364512);
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var newDate = new Date(1365222221485);

    result = simpletime.isDatesInRange(oldDate, newDate, 'month');

    expect( result ).toBe( false );
  });

  it("should return true when dates are within the same year", function () {
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var oldDate = new Date(1365222221485);
    //Sun Apr 07 2013 23:59:59 GMT-0700 (PDT)
    var newDate = new Date(1365404399998);  

    result = simpletime.isDatesInRange(oldDate, newDate, 'year');

    expect( result ).toBe( true );
  });

  it("should return false when dates are not within the same year", function () {
    //Wed Mar 03 2010 17:32:44 GMT-0800 (PST)
    var oldDate = new Date(1267666364512);
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var newDate = new Date(1365222221485);

    result = simpletime.isDatesInRange(oldDate, newDate, 'year');

    expect( result ).toBe( false );
  });
});

describe("simpletime.extractDateFormatted", function () {
  var result, resultExpected;

  it("should return a correct date object form formatted date, full", function () {  
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485), result, resultExpected,
        dateFormatLong = "MMMM d, y h:mm:ss a z",
        dateFormatted = 'April 5, 2013 9:23:41 pm 420';

    result = simpletime.extractDateFormatted(dateFormatted, dateFormatLong);
    /*
    resultExpected = 'Fri Apr 05 2013 22:23:49 GMT-0700 (PDT)';
    expect( result ).toBe( resultExpected );
     */
  });

  it("should return a correct date object form formatted date, medium", function () {  
    //Fri Apr 05 2013 21:23:41 GMT-0700 (PDT)
    var date = new Date(1365222221485), result, resultExpected,
        dateFormatMedium = "MMM d, y h:mm:ss a",
        dateFormatted = 'April 5, 2013 9:23:41 pm 420';

    result = simpletime.extractDateFormatted(dateFormatted, dateFormatMedium);
    /*
    resultExpected = 'Fri Apr 05 2013 22:23:49 GMT-0700 (PDT)';
    expect( result ).toBe( resultExpected );
     */
  });
});

