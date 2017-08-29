var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;


var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */

   if(parsedUrl.pathname == '/listings') {
    //if url ends in listings, then send listingData in the JSON and end the response. 
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(listingData);
    response.end();
   }
   else{
    response.statusCode = 404;
    response.end('Bad gateway error');
   }

};

//Create the server with the request.
server = http.createServer(requestHandler);


fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */
   listingData = data;
   server.listen(port, function() {
    console.log('server listening on: http://localhost:' + port);
   });
});



