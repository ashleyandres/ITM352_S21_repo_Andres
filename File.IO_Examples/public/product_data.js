products = [
    { "model":"Apple iPhone XS", 
    "price": 990.00 },
    { "model":"Samsung Galaxy", 
    "price": 240.00 }
    ];

if(typeof module != 'undefined') {
        module.exports.products = products; 
        //want to export the array --> make it availble to other programs that require this product data
 }
    