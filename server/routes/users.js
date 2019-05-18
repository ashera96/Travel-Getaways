const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const config = require('../config/database');

// Register
router.post('/register', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: 'User created',
                        createdUser: {
                            name: result.name,
                            email: result.email,
                            password: result.password,
                            _id: result._id
                        }
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    })
                });

        }
    })
});

// Authenticate
router.post('/authenticate', (req, res, nexxt) => {
    const email = req.body.email;
    const password = req.body.password;
    User.find({email: email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    return result.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id,
                    }, 
                    config.secret, 
                    {
                        expiresIn: "1h"
                    }
                    );
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: 'Bearer ' + token,
                        user: {
                            id: user[0]._id,
                            name: user[0].name,
                            email: user[0].email
                        }
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })

});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, nexxt) => {
    res.json({
        user: req.user
    })
});

module.exports = router;