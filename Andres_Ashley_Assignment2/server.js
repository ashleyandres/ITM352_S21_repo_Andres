var express = require('express');
var app = express();
var myParser = require("body-parser");
var qs = require('qs');  //reads through the JSON object
var products = require('./static/products.js'); //loads my products
var user_data_file = require('./user_data.json');
var fs = require('fs'); //to read the files
app.use(myParser.urlencoded({ extended: true })); // load my url that is encoded

//Reference to 4/13/21 lecture Lab 13
var filename = './user_data.json' //gives filename a variable

//Check if a file exsist and how big it is
if (fs.existsSync(filename)) {
    var stats = fs.statSync(filename);
    console.log(`${filename} has ${stats["size"]}characters`); //gives us character count of the file
    var user_data = JSON.parse(fs.readFileSync('./user_data.json', 'utf-8'));
} else {
    console.log(`${user_data_file} does not exsist`);
}

//Read User data file


//any request methods 
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();

});

//--------------Process_Login---------------//
//Reference to 4/13/21 Lecture

app.post('/process_login', function (request, response, next) {
    console.log(request.body);

    //Variables
    var error =[];
    let username_entered = request.body["username"];
    let password_entered = request.body["psw"];

    //---Check Login---//
    //check if the username is valid
    if (typeof user_data[username_entered] != 'undefined'){
        //check if it matches with password
        if(user_data[username_entered]['password']== password_entered){
        //what to do if it is all validated
            response.send('okay');

        //wrong password?
        } else {
           error.push("bad");
        }


        //wrong username?
        } else {
            alert('Incorrect Username');
        }
        


    //All good, send to the invoice
    request.query["purchase_submit"] = "true";
    request.query["username"] = request.body["username"];
    response.redirect('invoice.html?' + qs.stringify(request.query));

});


//------------Process_Registration--------//


app.post('process_registration', function (request, response) {

});

//Adding a new user
username= 'newuser'
user_data[username]= {};
user_data[username].password = "newpass";
user_data[username].email ='newuser@user.com';
user_data[username].name ='Ashley Andres';

//save the updated user data to the file
fs.writeFileSync(user_data_file, JSON.stringify(user_data));

//----------Process_Purchase-----------//
app.post('process_purchase', function (request, response) {

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

//if (post_data('username')){
   // quantity_form['username'].value = params.get('username');
  //  checkQuantityTextbox(quantity_form['quantity_textbox']);
//}