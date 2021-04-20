var express = require('express');
var app = express();
var data = require('./static/products.js');
var products = data.products;
var myParser = require("body-parser");
const qs = require('qs');  //reads through the JSON object
var products = require('./static/products.js'); //loads my products
//var user_data_file = require('./user_data.json');
var fs = require('fs'); //to read the files
//any request methods 
var filename = 'user_data.json';
const { request } = require('express');




app.all('*', function (request, response, next) {
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






//--------------Process_Login---------------//
//Reference to 4/13/21 Lecture, Lab 13

app.post('/process_login', function (request, response, next) {

    //Variables
    var error = [];
    username = request.body.username;
    console.log(request.query);
    let username_entered = request.body["username"];
    let password_entered = request.body["password"];

    //---Check Login---//
    //check if the username is valid
    if (typeof user_data[username_entered] != 'undefined') {
        //check if it matches with password
        if (user_data[username_entered]['password'] == password_entered) {
            //All good, send to the invoice
            request.query["purchase_submit"] = "true";
            request.query["username"] = request.body["username"];
            response.redirect('invoice.html?' + qs.stringify(request.query));

            //wrong password?
        } else {
            error.push("Invalid Password");
            console.log(error);
            request.query.username = username;
            request.query.name = user_data[username].name;
            request.query.error = error.join(';');
        }


        //wrong username?
    } else {
        error.push = ('Invalid Username');
        console.log(error);
        request.query.username = username;
        request.query.error = error.join(';');
    }
    response.redirect('./login.html?' + qs.stringify(request.query)); // If error is present, remain on the login page
});







//------------Process_Registration--------//

app.post('/process_registration', function (request, response) {
    console.log(request.body);

    //variables
    username = request.body.username;
    var RegError = [];

    //Validate Name
    if (/^[A-Za-z]+$/.test(request.body.name)) {//only letters can be used
    }
    else {
        RegError.push('Invalid Name');
    }

    if (request.body.name !== "") { //there must be a space in order to be a valid name
    }
    else {
        RegError.push('Invalid Name');
    }


    //-----Validate Email-----//
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (request.body.email.match(mailformat)) {
    }
    else {
        RegError.push('Invalid Email');
    }


    //-----Validate Username----//

    //Make sure that username is unique --> checks in DB in all lowercase (aka not case sensitive)
    var reguser = request.body.username.toLowerCase();

    //not define? username is not unique
    if (typeof user_data[reguser] != 'undefined') {
        RegError.push('Username taken');
    }

    if (request.body.username.length < 5 && request.body.username.length < 0) {
    } else {
        RegError.push('Username too Short');
    }
    if (/^[0-9a-zA-Z]+$/.test(request.body.username)) {
    }
    else {
        RegError.push('Letters And Numbers Only for Username');
    }

    //----Validate Password----//
    if (request.body.password.length < 6) {
        RegError.push('Password Too Short');
    }

    if (RegError.length == 0) {
        console.log('Create New User')
        //Adding a new user, 
        //Used Lab 14 as foundation, and reference Alyssa Mencel's A2 to help modify --> more for the posting parts
        let POST = request.body;

        //send data to user_data.json to be stored
        username = POST['username'];
        user_data[username] = {};
        user_data[username].name = POST['name'];
        user_data[username].password = POST['password'];
        user_data[username].email = POST['email'];
        register = JSON.stringify(user_data); //parses and stores new user data in reg_info_str

        //Add the new user into the database (user_data.json)
        fs.writeFileSync(user_data_file, register, "utf-8");
        request.query["purchase_submit"] = "true";
        request.query["username"] = request.body["username"];
        response.redirect('invoice.html?' + qs.stringify(request.query));
    } else {
        request.query.RegError = RegError.join(';');
        response.redirect('registration.html?' + qs.stringify(request.query));

    }


});

//------Process_Purchase------//
app.post("/process_purchase", function (request, response) {
    let POST = request.body;

    //Algorithm from Assign1 for validating qty modified for server
    if (typeof POST['submitPurchase'] != 'undefine') {

        //Variables
        no_errors = true;
        has_quantities = false;

        //Validating
        for (i = 0; i < products.length; i++) {
            purchase = POST(`quantity${i}`);
            no_errors = has_quantities || purchase > 0;
            no_errors = has_quantities && isNonNegInt(purchase);
        }
        const stringified = qs.stringify(POST);
        if (no_errors && has_quantities) {
            response.redirect('./login.html?' + stringfied);
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

