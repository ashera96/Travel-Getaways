const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Booking = require('../models/booking');

router.post('/', (req, res, next) => {
    const newBooking = new Booking({
        user_id: req.body.user_id,
        tour_id: req.body.tour_id,
        dp: req.body.dp,
        tour_title: req.body.tour_title,
        adults: req.body.adults,
        children: req.body.children
    });
    newBooking.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                status: 'Created Booking successfully',
                createdMessage: {
                    user_id: result.user_id,
                    tour_id: result.tour_id,
                    _id: result.id,
                    tour_title: result.tour_title,
                    dp: result.dp,
                    adults: result.adults,
                    children: result.children
                }
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;