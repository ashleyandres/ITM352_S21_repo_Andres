var express = require('express');
var myParser = require("body-parser");
var fs = require('fs');
var app = express();
app.use(myParser.urlencoded({extended: true}));

app.post("/process_name", function (request, response){
    // response.send(requesnt.body);
    let POST = request.body;
    var contents = fs.readFileSync('./View/display_login_template.html', 'utf8');
    response.send(eval('`' + contents + '`')); // render template string
});
app.use(express.static('./public'));
app.listen(8080);