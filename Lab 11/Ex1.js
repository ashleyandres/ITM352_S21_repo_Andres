//FINDS IF AN INTERGER IS POSITIVE
function isNonNegInt(string_to_check, returnErrors = false) {
    errors = []; 
    // This function will return true if string_to_check is a NonNegInt. If returnErrors = true, it will return an array of reasons why it is a NonNegInt. 
    if(Number(string_to_check) != string_to_check) errors.push('Not a number!'); 
    // Check if string is a number value
    if(string_to_check < 0) errors.push('Negative value!'); 
    // Check if it is non-negative
    if(parseInt(string_to_check) != string_to_check) errors.push('Not an integer!'); 
    // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
    }
    

checkIt ('item', 'index'){
    console.log(`part ${index} is ${(isNonNegInt(item)?'a':'not a')} quantity`);
}
pieces.forEeach((item,index) => {checkIt ('item', 'index'){
    console.log(`part ${index} is ${(isNonNegInt(item)?'a':'not a')} quantity`);} ) 

function monthly_sales.forEach(tax_rate)=> {
    return ('tax_owing');
}

attributes  =  "Ashley;21;MIS.";
parts = attributes.split(';');
for (part of parts){
    console.log(isNonNegInt);
}
//console.log(parts);