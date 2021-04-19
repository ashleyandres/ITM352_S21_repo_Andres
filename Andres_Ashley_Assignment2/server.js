var express = require('express');
var app = express();
var myParser = require("body-parser");
var qs = require('qs');  //reads through the JSON object
var products = require('./static/products.js'); //loads my products
//var user_data_file = require('./user_data.json');
var fs = require('fs'); //to read the files
//any request methods 
app.use(myParser.urlencoded({ extended: true })); // load my url that is encoded


app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();

});

//Reference to 4/13/21 lecture Lab 13
const { response, request } = require('express');
var user_data_file = './user_data.json';
if (fs.existsSync(user_data_file)){
    var file_stats = fs.statSync(user_data_file);
    console.log(file_stats["size"]);
    var user_data = JSON.stringify (fs.readFileSync('./user_data.json', 'utf-8')); // read the file line by line
} else {
    console.log(`${user_data_file}`)
}





   
//--------------Process_Login---------------//
//Reference to 4/13/21 Lecture, Lab 13

app.post('/process_login', function (request, response, next) {
    console.log(request.body);

    //Variables
    var error =[];
    let username_entered = request.body["username"];
    let password_entered = request.body["password"];

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


app.post('/process_registration', function (request, response) {
//Adding a new user, 
//Used Lab 14 as foundation, and reference Alyssa Mencel's A2 to help modify --> more for the posting parts
username = request.body["username"];
    user_data[username] = {};
    user_data[username]["password"] = request.body["password"];
    user_data[username]["email"] = request.body["email"];
    user_data[username]["fullname"] = request.body["fullname"];
    // Save updated user_data to file
    fs.writeFileSync(user_data_file, JSON.stringify(user_data));
    res.send(`${username} is registered`);
});




//save the updated user data to the file



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