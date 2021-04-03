var express = require('express');
var app = express();

//first one is going to always execute before the other below it no matter what

app.get('/test', function (request, response, next) {
    console.log('issa vibe');
    next(); //executes after the above is execute
});
app.all('*', function (request, response, next) {
    response.send(request.method + ' to path ' + request.path + 'with query' +request.query);
});
app.listen(8080, function (){
    console.log('listening on port 8080')
} 
);// note the use of an anonymous function here
