var http = require('http'); //load the http package

//create a server object:
http.createServer(function (req, res) { 
    //creates a loop for request on port 8080, similar to the while loop. Imagine just like calling someone and this is basically the "ringing" of the phone, waiting for a response.

    //Function (req,res) is like the response or answering the phone

    // below is like the conversation

    console.log(req.headers); //output the request headers to the console
    res.writeHead(200, { 'Content-Type': 'text/html' }); // set MIME type to HTML 
    res.write(`<h1>The server date is: ${Date.now()}</h1>`); //send a response to the client
    res.write('<h1>The client date is: <script>document.write( Date.now() );</script></h1>'); // send another response
    res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

console.log('Hello world HTTP server listening on localhost port 8080');

// the stuff in green is the HTML stuff
//res = what is said/ talking back / the conversation