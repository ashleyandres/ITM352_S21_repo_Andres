day = 6;
month = 'August';
year = 2000;
if (month == 'January'|| month == 'February'){
    step1 = year -1;
}
else {
    step1 = year;
}
step2 = parseInt(step1/4) + step1;
step3 = step2 - parseInt(step1/100);
step4 =  parseInt(step1/400) + step3;
step5 = day + step4;
monthKey = {
'January':0,
'February':	3,
'March':2,
'April':5,
'May':0,
'June':3,
'July':5,
'August':1,
'September':4,
'October':6,
'November':	2,
'December':	4
};
step6 = step5 + monthKey[month];
step7 = step6%7;
numToDay =[
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]

console.log(`${month} ${year} was a ${numToDay[step7]}`);