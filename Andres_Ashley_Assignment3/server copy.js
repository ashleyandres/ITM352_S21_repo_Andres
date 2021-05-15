//Ashley Andres's Server Fall 2020//
var express = require('express');//packaged middle-ware, makes server operate
var app = express();
var data = require('./static/products.js'); //get my products
var allproducts = data.products;
var myParser = require("body-parser"); //reads through the JSON object
const qs = require('qs');  //var for the querystring
var products = require('./static/products.js'); //loads my products
//var user_data_file = require('./user_data.json');
var fs = require('fs'); //to read the files
//any request methods 
var filename = 'user_data.json'; //var for the user db

//my cookie middle-ware
var cookieParser = require('cookie-parser'); 
var session = require('express-session');
app.use(session({ secret: "ITM352 rocks!" }));

app.use(cookieParser());
//var session = require('express-session');

const { request } = require('express'); //utilize express

var nodemailer = require("nodemailer");


//For all oputputs
app.all('*', function (request, response, next) {
    if (typeof request.session.cart == 'undefined') {
        request.session.cart = {};
    }
    console.log(request.method + ' to ' + request.path);
    next();

});

app.use(myParser.urlencoded({ extended: true })); // load my url that is encoded


//Reference to 4/13/21 lecture Lab 13, reads the file json
var user_data_file = './user_data.json';
if (fs.existsSync(filename)) {
    var file_stats = fs.statSync(filename);
    console.log(file_stats["size"]);
    var user_data = JSON.parse(fs.readFileSync(user_data_file, 'utf-8')); // read the file line by line
} else {
    console.log(`${user_data_file}`)
}

//______Gives thes products data to cart.html_________//
app.post("/get_products", function (request, response){
    response.JSON(request.session.cart);
});

//______Gives thes quantity data to cart.html_________//
//____Assignment #3 Code Example + Tuesday Screencasts__//
app.post("/get_cart", function (request, response){
    console.log(request.session.cart);
    response.JSON(request.session.cart);

});


//--------------Process_Login---------------//
//Reference to 4/13/21 Lecture, Lab 13

app.post('/process_login', function (request, response, next) {

    //Variables
    var error = [];
    username = request.body.username;
    console.log(request.query);
    var username_entered = request.body["username"];
    var password_entered = request.body["password"];

    //---Check Login---//
    //check if the username is valid
    if (typeof user_data[username_entered] != 'undefined') {
        //check if it matches with password
        if (user_data[username_entered]['password'] == password_entered) {
            //All good, send to the invoice
            request.query["checkout_submit"] = "true";
            request.query["username"] = request.body["username"];
            
            //____Logging In____//
            //Cookie --> Screencast 4/27/21, Lab 15 
            response.cookie('username', username_entered);
            console.log(response.cookie);
            response.redirect('invoice.html?' + qs.stringify(request.query)); 

         //wrong password?, let the console know, push error to alert on login page
        } else {
            error.push("Invalid Password");
            console.log(error);
            request.query.username = username;
            request.query.name = user_data[username].name;
            request.query.error = error.join(';');
        }


    //wrong username?, let the console know, push error to alert on login page
    } else {
        error.push = ('Invalid Username');
        console.log(error);
        request.query.username = username;
        request.query.error = error.join(';');
    }
    response.redirect('./Login.html?' + qs.stringify(request.query)); // If error is present, remain on the login page
});

//_______________Logging Out________________//
app.get("/logout" , function (request, response) {
    var logout_str = `<script>alert('${user_data[username].name} has successfully logged out!'); location.href="./index.html";</script>`;
    response.clearCookie('username');
    response.send(logout_str);
});





//------------Process_Registration--------//
//--Validations are reference to Alyssa Mencel's Fall 2020 Assignment 2, Notes also were reference--//
app.post('/process_registration', function (request, response) {
    console.log(request.body);

    //variables
    var RegError = [];

    //--Validating Name---//
    
    if (/^[A-Za-z] + [A-Za-z]+$/.test(request.body.name)) { //Only letters
    }
    else {
      RegError.push('Use Only Letters for Full Name')
    }


    if (request.body.name == " ") { //requires this field
      RegError.push('Invalid Full Name');
    }
   
    if (request.body.name.length <30) {
    } else {
        RegError.push('Name Too Long');
    }

    //-----Validate Email-----//
    //reference to w3 schools
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (request.body.email.match(mailformat)) {
    }
    else {
        RegError.push('Invalid Email');
    }


    //-----Validate Username----//

    //Make sure that username is unique --> checks in DB in all lowercase 
    var reguser = request.body.username.toLowerCase();

    //not define? username is not unique
    if (typeof user_data[reguser] != 'undefined') {
        RegError.push('Username taken');
    }
    //min 4 characters, max 10 characters
    if (request.body.username.length > 4 || request.body.username.length < 10 ) {
    } else {
        RegError.push('Username Invalid');
    }
    //numbers and letters only
    if (/^[0-9a-zA-Z]+$/.test(request.body.username)) {
    }
    else {
        RegError.push('Letters And Numbers Only for Username');
    }

    //----Validate Password----//
    if (request.body.password.length < 6) {
        RegError.push('Password Too Short');
    }

    //--Confirm Password---//
    if (request.body.password !== request.body.cpassword) { 
        errors.push('Password Not a Match')
    
    }

    //Sticky
    request.query.name = request.body.name;
    request.query.username = request.body.username;
    request.query.email = request.body.email;

    if (RegError.length == 0) {
        console.log('Create New User')

        //---Adding a new user---//
        //Used Lab 14 as foundation
        //variable
        var POST = request.body;

        //send data to user_data.json to be stored
        username = POST['username'];
        user_data[username] = {};
        user_data[username].name = POST['name'];
        user_data[username].password = POST['password'];
        user_data[username].email = POST['email'];
        register = JSON.stringify(user_data); //parses and stores new user data in reg_info_str

        //Add the new user into the database (user_data.json)
        //Referred to Alyssa Mencel's server for this
        fs.writeFileSync(user_data_file, register, "utf-8");
        request.query["checkout_submit"] = "true";
        request.query["username"] = request.body["username"];
        response.redirect('invoice.html?' + qs.stringify(request.query));
    
    } else { //if there are errors, keep on reg page
        request.query.RegError = RegError.join(';');
        response.redirect('./Registration.html?' + qs.stringify(request.query));

    }


});

//------Process_Purchase------//
app.post("/add_to_cart", function (request, response) {
    var POST = request.body;

    //Algorithm FROM Alyssa Mencel's Assignment 1, some variables changed for my understanding and tailored to my own variables

    if (typeof POST['add_qty'] != 'undefine') {

        //Variables
        no_errors = true;
        has_quantities = false;

        //Validating
        var quantities=[];
        for (i = 0; i < products["product_type"].length; i++) {
            var purchase = POST(`quantity${i}`);
            has_quantities = has_quantities || purchase > 0;
            no_errors = has_quantities && isNonNegInt(purchase);
            console.log(has_quantities, no_errors);
        }
        //Add to Cart
        //Office Hours with Prof. Port, sets the session cart
        if (no_errors && has_quantities) {
            request.session.cart[product_key] = POST;
        }
        console.log(request.session.cart[product_key]);
       response.send(request.session.cart);
           
        }
        //send to login page
        const stringified = qs.stringify(POST); //var
        if (no_errors || has_quantities) {
            response.redirect('./Login.html?' + stringfied);
            return;
        }
        else {
            //did not pass validation? stay on page
            response.redirect('./products.html?' + stringified)
        }
    }

});

app.use(express.static('./static'));
app.listen(8080, () => console.log(`listening on port 8080`));

//Validation code borrowed from Assign.1
function isNonNegInt(q, returnErrors = false) {
    if (q == '') q = 0;
    var errors = [];
    if (Number(q) != q) errors.push('Not a number!');
    if (q < 0) errors.push('Negative value!');
    if (parseInt(q) != q) errors.push('Not an integer!');

    return returnErrors ? errors : (errors.length == 0);
}
//Validation for the username and password
function checkQuantityTextbox(qtyTextboxObj) {
    errs = isNonNegInt(qtyTextboxObj.value, true);
    document.getElementById(qtyTextboxObj.name + "_message").innerHTML = errs.join(' , ');
}

