const http = require('http');
const fs = require('fs');
const path = require('path');
const { constants } = require('buffer');

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {

    console.log('request for ' + req.url + ' by method ' + req.method);

    if (req.method == 'GET') {

        var fileUrl;
        if (req.url == '/') {
            fileUrl = '/index.html';
        } else {
            fileUrl = req.url
        }

        var filePath = path.resolve('./public' + fileUrl);

        const fileExt = path.extname(filePath);

        if (fileExt == '.html') {

            fs.access(filePath, constants.F_OK, (err) => {

                if (err) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html> <body> <h1> Error 404 :' + fileUrl + ' does not exist </h1></body> </html>');
                } else {

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    fs.createReadStream(filePath).pipe(res);
                }
            });

        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html> <body> <h1> Error 404 :' + fileUrl + ' not a html file </h1></body> </html>');
        }

    } else {

        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html> <body> <h1> Error 404 :' + fileUrl + ' not supported </h1></body> </html>');
    }

})

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);
})