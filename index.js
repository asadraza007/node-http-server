const http = require('http');
const fs = require("fs");
const path = require("path");

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    if(req.method === "GET"){
        serveFile(req,res);
    }else {
        method404(req,res);
    }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


function method404(req,res) {
    res.statusCode = 404;
    
      res.setHeader('Content-Type', 'text/html');
      res.end('<html><body><h1>Error 404: ' + req.method + ' not supported</h1></body></html>');
}

function serveFile(req,res){
    var filepath;
    
    if(req.url === "/"){
        filepath = path.resolve("./index.html");        
    } else {
        filepath = path.resolve("."+req.url)
    }

    console.log("req.url",req.url)
    const extension = path.extname(filepath);
    var contentType = "*";
    fs.exists(filepath, (exists) => {
        if (exists === false) {
            notFound(req,res);
        } else if(exists === true){
            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);
            fs.createReadStream(filepath).pipe(res);    
        }
        });
}

function notFound(req,res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Error 404: ' + req.url + ' not found</h1></body></html>');
}