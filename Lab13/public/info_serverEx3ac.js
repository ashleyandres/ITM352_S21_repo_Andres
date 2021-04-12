var express = require('express');
var app = express();
var myParser = require("body-parser");
const { response } = require('express');
app.use(myParser.urlencoded({ extended: true }));



app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path + 'with query'+ JSON.stringify(request.query));
   next();
    
});

app.get('/test', function (request, response, next) {
  response.send ('I got a POST request for /test');
});

app.post('/Login.html', function (request, response, next) {
  user_data = {'username': 'itm352' ,'password': 'grader'}
  post_data = request.body;
  response.send (post_data);
});

app.use(express.static('./public'));



app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here

function isNonNegInt(q, returnErrors = false) {
  if (q == '') q = 0;
  var errors = [];
  if (Number(q) != q) errors.push('Not a number!');
  if (q < 0) errors.push('Negative value!');
  if (parseInt(q) != q) errors.push('Not an integer!');

  return returnErrors ? errors : (errors.length == 0);
}if (post_data('quantity_textbox')){
  if (isNonNegInt(the_qty)){
    response.send(`Thanks for purchasing ${the_qty} items!`);
    return;
  } else {
    response.send (`Hey! ${the_qty}
  }
  quantity_form['quantity_textbox'].value = params.get('quantity_textbox');
  checkQuantityTextbox(quantity_form['quantity_textbox']);
}