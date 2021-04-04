var fs = require ('fs');

data = "\nI've been gud";
filename="info.dat";

fs.appendFileSync(filename, data, "utf-8");
console.log("Woo! Woo!")