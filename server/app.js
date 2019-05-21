const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config/database');

// Connect to database
mongoose.connect(config.database,  {useNewUrlParser: true});

//  On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});

const app = express();

// Required Routes
const users = require('./routes/users');
const messages = require('./routes/messages');
const mail = require('./routes/email');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Body Parser Midleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Application Routes
app.use('/users', users);
app.use('/messages', messages);
app.use('/reply', mail);

// Index Route
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Success"
    });
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});