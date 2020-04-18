const fs = require('fs');
const os = require('os');
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
  var load = [];
  req.on('data', (c) => {
    console.log(c);
    load = load + [c];
  });
  req.on('end', () => {
    res.statusCode = 200;
//    res.setHeader('Content-Type', 'text/plain');
    fs.readFile("./main.html",'utf-8',(err, data) => {
      if(err){}else{res.end(data);}
    });
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
