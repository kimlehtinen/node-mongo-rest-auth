const express = require('express');
const app = express();
const http = require('http');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

app.use((req, res, next) => {
    res.status(200).json({
        test: 'Hello world!'
    });
});

server.listen(port);
