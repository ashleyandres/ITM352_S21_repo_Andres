var fs = require ('fs');

var filename = "info.dat";
if (fs.existsSync(filename)) {	
    data = fs.readFileSync(filename, 'utf-8');
    console.log ("Success!" + data);
} else {
    console.log("no data :( " + filename);
}




