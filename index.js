const http = require('http');
const url = require('url');
const fs = require('fs');

const port = 3000;

function filetoFind(searchParam) {
    if(searchParam === '/') {
        return '/index'
    } else {
        return searchParam;
    }
}

const server = http.createServer( (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    const query = new URL(req.url, 'http://localhost:3000');

    fs.readFile(`.${filetoFind(query.pathname)}.html`, (err, data) => {
        if(err) {
            res.end(fs.readFileSync('./404.html'))
        }
        res.end(data);
    })
});

server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});