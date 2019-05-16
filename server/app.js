const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes which should handle requests
const userRoutes = require('./api/routes/user');

app.use(cors({
    origin: ['http://localhost:4200','http://127.0.0.1:4200'],
    credentials: true
}));

mongoose.connect(
    'mongodb+srv://admin:' + 
    process.env.MONGO_MLAB_PW + 
    '@cluster0-dtohb.gcp.mongodb.net/test?retryWrites=true', {useNewUrlParser: true}
);

// Configuring passport start
const passport = require('passport');
const session = require('express-session');

app.use(session({
    name: 'myname.sid',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000,
        httpOnly: false,
        secure: false
    }
}));

require('./api/config/passport-config');
app.use(passport.initialize());
app.use(passport.session());
// Configuring passport end

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error =  new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;