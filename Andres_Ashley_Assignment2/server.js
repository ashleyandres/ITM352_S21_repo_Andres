// Referencve from Assgnment 2 Example, Lab 13, and Lab14 examples. Used Alyssa Mencel [Fall2020] Assgnment 2 server.js to understand what each code meant --> another way of explaining the code and their functions

var express = require('express');// a middle-ware to help load the page
var app = express();
var myParser = require("body-parser"); // utlizes the middleware body-parser and allows anything to POST any data that allows it
var qs = require('qs');
var products = require('./user_data.json');
console.log(name)

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

});

app.post('/process_login', function (request, response, next){ 
    console.log(request.query);
    //vaildate username
    user_data ={'username': 'itm352', 'password': 'grader'};
    post_data = request.body;
    if (post_data['username']){
        the_username = post_data['username'];
        if(user_data['username']== post_data['username']){
            response.send(`Thanks ${the_username}!`);
            return;
        }
        else {
            response.send(`bad ${the_username}!`);
            return;
        }
    }
    //validate password

    //good to go? go to invoice.html
    request.query["purchased"]= "true"
    request.query["username"]=request.body["username"]
    response.redirect('invoice.html?'+ qs.stringify(request.query));
});
//Process registration
app.post('/process_register')

//Process purchase
app.post ('/process_form')
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
function checkQuantityTextbox(qtyTextboxObj) {
    errs = isNonNegInt(qtyTextboxObj.value, true);
    document.getElementById(qtyTextboxObj.name + "_message").innerHTML = errs.join(' , ');
}