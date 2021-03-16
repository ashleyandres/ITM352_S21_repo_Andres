d = 6
m = August
yr = 2000
step1 = 
if (January || February);{
    step1 = 1 - yr
};
else(!January || !February);{
    step1 = yr
};
step2 = step1 + parseInt(step1/4) 
step3 = step2 - parseInt(step1/100)
step4 = step3 + parseInt(step1/400)
step5 = d + step4
step6 =
monthkey = 
{"January":0,
"February":1,
"March": 2,
"April":5,
"May":0,
"June":3,
"July":5,
"August":1,
"September":4,
"October":6,
"November":2,
"December":4
};
step7 = %(step6/7)
d.getday(); 
day = [
    {'day': 'Sunday', 'number': 0},
    {'day': 'Monday', 'number': 1},
    {'day': 'Tuesday', 'number': 2},
    {'day': 'Wednesday', 'number': 3},
    {'day': 'Thursday', 'number': 4},
    {'day': 'Friday', 'number': 5},
    {'day': 'Saturday', 'number': 6},

];
console.log(day, month, year)






