const express = require('express');

const app = express();
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const homeRoutes = require('./routes/home');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

/*
  In order to connect to mongodb we use an environment variable called DB_URL.
  In dev mode it uses the value given in nodemon.json.
  In production it uses the value given in docker-compose.yml.
*/
mongoose.connect(
  `mongodb://${process.env.DB_URL}:27017/example-app`, { useCreateIndex: true, useNewUrlParser: true },
);
mongoose.Promise = global.Promise;

// logger
app.use(morgan('dev'));

// urlencoded and json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
  return false;
});

// API routes
app.use('/', homeRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Error handling
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

server.listen(port);
