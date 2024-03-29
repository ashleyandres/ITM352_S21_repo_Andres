var express = require('express');
var app = express();
var myParser = require("body-parser");
const { response } = require('express');
app.use(myParser.urlencoded({ extended: true }));

app.get('/test.html', function (request, response, next) {
  response.send ('I got a request for /test');
});

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path + 'with query'+ JSON.stringify(request.query));
   next();
    
});


app.post ('/process_login', function (request, response, next){
  user_data = {'username':'itm352', 'password':'grader'};
  post_data = request.body;
  if (post_data ['quantity_textbox']){
    the_qty = post_data ['quantity_textbox']
    if(user_data['username']== post_data['email']){
    response.redirect ('invoice.html?quantity_textbox='+the_qty) ;
    } else {
      response.redirect('./order_page.html? quantity_textbox='+the_qty);
      return;
    }
  }
  
});
app.use(express.static('./public')); //request to no file, automatically will look for index.html



app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here

function checkQuantityTextbox(qtyTextboxObj) {
  errs = isNonNegInt(qtyTextboxObj.value, true);
  document.getElementById(qtyTextboxObj.name + "_message").innerHTML = errs.join(' , ');
}
 //Check for Errors, make sure they are putting valid input
 function isNonNegInt(q, returnErrors = false) {
  if (q == '') q = 0;
  var errors = [];
  if (Number(q) != q) errors.push('Not a number!');
  if (q < 0) errors.push('Negative value!');
  if (parseInt(q) != q) errors.push('Not an integer!');

  return returnErrors ? errors : (errors.length == 0);
}
