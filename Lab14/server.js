// Referencve from Assgnment 2 Example, Lab 13, and Lab14 examples. Used Alyssa Mencel [Fall2020] Assgnment 2 server.js to understand what each code meant --> another way of explaining the code and their functions

var express = require('express');// a middle-ware to help load the page
var app = express();
var myParser = require("body-parser"); // utlizes the middleware body-parser and allows anything to POST any data that allows it
var qs = require('qs'); //query string
app.use(myParser.urlencoded({ extended: true })); // load my url that is encoded
//user_data = require ('.user_data.json')
var fs = require('fs'); //file system


//user_data = require('./user_data.json');
//console.log(user_data['dport']['password']);

//Read user data file
var user_data_file = './user_data.json';
if (fs.existsSync(user_data_file)) {
    var file_stats = fs.statSync(user_data_file);
    //console.log(file_stats);
    var user_data = JSON.parse(fs.readFileSync(user_data_file, 'utf-8'));
} else {
    // console.log(`${user_data_file}does not exsist`);
}

//read it as a string, same thing a require would do, parse makes it into an object, use this if you want to read it line by line
console.log(typeof user_data);







//any request methods 
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();

})


//Process of Login
app.post('/process_login', function (request, response, next) {
    console.log(request.body);
    let username_entered = request.body["username"];
    let passoword_entered = request.body["psw"];
    if (typeof user_data[username_entered] != 'undefined') {
        if (user_data[username]['password'] == password_entered);
        response.send (`${username_entered}is logged in`)
    } else {
        response.send (`${username_entered}not found`)
    }
    //match username and passowrd in database; credentials

    //check  username

    //validate username

    //check password

    //check if they match

    //no good, tell them its bad



    //they match allgood, send to invoice
    request.query["purchased"] = "true";
    request.query["username"] = request.body["username"];
    response.redirect('invoice.html?' + qs.stringify(request.query));

});

//Process of Registration
app.post('/process_register', function (request, response, next) {
    //match username and passowrd in database
});


//Processing the Purchase [IN THE WORKS!!! Fix Algorithm]
app.post('/process_purchase', function (request, response, next) {
    let POST = request.body; //loads the body of the page
    if (typeof POST['purchase_submit'] != 'undefined') {
        var has_errors = false;
        var has_quantities = false;
        for (i = 0; i < products.length; i++) {

            qty = POST[`quantity${i}`];
            has_errors = has_quantities || qty > 0; //value is inputed and says it is greater than 0
            has_errors = has_quantities && isNonNegInt(qty); //valid quantity
        }
        // if all quantities are valid, generate the invoice Ref. Alyssa Mencel code. Looks simple and easy to understand
        if (has_errors && has_quantities) { // qualifies as a valid quantity then redirect to login page
            response.redirect("./login.html?" + stringified);
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