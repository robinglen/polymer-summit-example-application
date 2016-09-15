const http = require('http');
const fs = require('fs');
const path = require('path');

const pl1 = fs.readFileSync(path.join(__dirname, 'responses/product-list-1.json'));
const pl2 = fs.readFileSync(path.join(__dirname, 'responses/product-list-2.json'));
const pl3 = fs.readFileSync(path.join(__dirname, 'responses/product-list-3.json'));

const server = http.createServer(serve);

function successResponse(req, res) {
  var data = pl1;
  if (/\API\/3\/3\/.*/.test(req.url)){
      data = pl2;
  }
  if (/\API\/3\/6\/.*/.test(req.url)){
      data = pl3;
  }
  res.statusCode = 200;
  return res.end(data);
}


function serve(req, res) {

  console.log('STUB SERVER REQUEST: ', req.url);

    if (/\API.*/.test(req.url)) {

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');

      return successResponse(req, res);

   }

    res.statusCode = 404;
    return res.end('404');


}

server.listen(5001);
console.log('Running Stub Server on 5001');
