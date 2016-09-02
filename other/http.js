import http from "http";

http.createServer((req, res) => {
    // res.writeHead(200, {"content-type":"text/plain"});
    // res.end("hello world");

    //规范化字符串
    const url = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();
    switch(url){
        case '':
            res.writeHead(200, {"content-type":"text/plain"});
            res.end("homepage");
        break;
        case '/about':
            res.writeHead(200, {"content-type":"text/plain"});
            res.end("aboutpage");
        break;
        default:
            res.writeHead(404, {"content-type":"text/plain"});
            res.end("node founded");
        break;    
    }
}).listen(3000);