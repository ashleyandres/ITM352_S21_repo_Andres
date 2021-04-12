// Referencve from Assgnment 2 Example, Lab 13, and Lab14 examples. Used Alyssa Mencel [Fall2020] Assgnment 2 server.js to understand what each code meant --> another way of explaining the code and their functions

var express = require('express');// a middle-ware to help load the page
var app = express();
var myParser = require("body-parser"); // utlizes the middleware body-parser and allows anything to POST any data that allows it
var qs = require('qs');
var products = require('./static/products.js');

//user data holder for now
var users_reg_data = {
    "dport": { "name": "Dan Port", "password": "portspassword", "email": "dport@hawaii.edu" },
    "kazman": { "name": "Rick Kazman", "password": "kazmanpassword", "email": "kazman@hawaii.edu" },
    "itm352": { "name": "ITM 352", "password": "grader", "email": "itm352@hawaii.edu" }
};
//any request methods 
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();

})
app.use(myParser.urlencoded({ extended: true })); // load my url that is encoded

//Process of Login
app.post('/process_login', function (request, response, next) {
    //match username and passowrd in database

    //all good, send to invoice
    request.query ["purchased"]="true";
    request.query ["username"]=request.body["username"];
    response.redirect('invoice.html?' +qs.stringify(request.query));
});

//Process of Registration
app.post('/process_register', function (request, response, next) {
    //match username and passowrd in database
});


//Processing the Purchase [IN THE WORKS!!! Fix Algorithm]
app.post('/process_purchase', function (request, response, next) {
   let POST = request.body; //loads the body of the page
   if (typeof POST ['purchase_submit'] != 'undefined'){
        var has_errors = false;
        var has_quantities = false;
       for (i = 0; i < products.length; i++) {
        
        qty=POST[`quantity${i}`];
        has_errors = has_quantities|| qty > 0; //value is inputed and says it is greater than 0
        has_errors = has_quantities && isNonNegInt(qty); //valid quantity
}
        // if all quantities are valid, generate the invoice Ref. Alyssa Mencel code. Looks simple and easy to understand
        if (has_errors && has_quantities) { // qualifies as a valid quantity then redirect to login page
          response.redirect("./login.html?"+ stringified);
          return; //stops the function 
        }  
        // does not pass the valid quantity test? send back to the products page.
        else { 
            response.redirect("./products_display.html?" + stringified) 
        }
       }
});
 // variables that assume no errors


app.use(express.static('./static'));
app.listen(8080, () => console.log(`listening on port 8080`));


//Check for Errors, make sure they are putting valid input
function isNonNegInt(q, returnErrors = false) {
    if (q == '') q = 0;
    var errors = [];
    if (Number(q) != q) errors.push('Not a number!');
    if (q < 0) errors.push('Negative value!');
    if (parseInt(q) != q) errors.push('Not an integer!');

    return returnErrors ? errors : (errors.length == 0);
}