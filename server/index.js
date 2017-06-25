/**
 * Created by david on 6/23/17.
 */
// Advanced React and Redux | Udemy | Auth

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');

const app = express();

// db setup
mongoose.connect('mongodb://localhost:auth/auth');


// app setup
app.use(morgan('combined'));
// middleware: logs requests in the console.  mostly for debugging
app.use(bodyParser.json({ type: '*/*' }));
// middleware: parses json
router(app);

// server setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);