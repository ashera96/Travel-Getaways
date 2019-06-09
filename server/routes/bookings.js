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
        children: req.body.children,
        price: req.body.price
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
                    children: result.children,
                    price: result.price
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

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    Booking.find({'user_id':id})
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                bookings: docs
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:bookingId', (req, res, next) => {
    const id = req.params.bookingId;
    Booking.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Deleted Booking successfully'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;