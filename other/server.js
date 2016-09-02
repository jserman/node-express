import http from "http";
import fs from "fs";

function serverStaticFile(res, path, contentType, responseCode){
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, (err, data) => {
        if(err){
            res.writeHead(500, {"content-type":"text/plain"});
            res.end("server erroring");
        }else{
            res.writeHead(responseCode, {"content-type":contentType});
            res.end(data);
        }
    })
}


http.createServer((req, res) => {
    const url = req.url.replace(/\/?(?:\?.*)?$/,'');
    switch(url){
        case '':
            serverStaticFile(res, '/public/home.html', 'text/html', 200);
            break;
        case '/about':
            serverStaticFile(res, '/public/about.html', 'text/html', 200);
            break;
        case '/img/logo.jpg':
            serverStaticFile(res, '/public/img/logo.jpg', 'image/jpeg', 200);
            break;
        default:
            serverStaticFile(res, '/public/notfound.html', 'text/html', 200);
            break;
    }
}).listen(3000);