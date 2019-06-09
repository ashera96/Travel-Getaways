const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Message = require('../models/message');

// User sent message is stored ( from Contact Us page )
router.post('/', (req, res, next) => {
    const newMessage = new Message({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        telephone: req.body.telephone,
        message: req.body.message
    });
    newMessage.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                status: 'Created message successfully',
                createdMessage: {
                    _id: result.id,
                    firstname: result.firstname,
                    lastname: result.lastname,
                    email: result.email,
                    telephone: result.telephone,
                    message: result.message
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

// Messages are loaded to the admin dashboard
router.get('/', (req, res, next) => {
    Message.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                messages: docs
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

// Load a given message
router.get('/:messageId', (req, res, next) => {
    const id = req.params.messageId;
    Message.findById(id)
        .select('_id firstname lastname email telephone message')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    message: doc
                })
            } else {
                res.status(404).json({message: 'No valid entry found for provided ID'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
})

// Delete message
router.delete('/:messageId', (req, res, next) => {
    const id = req.params.messageId;
    Message.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Deleted message successfully'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

module.exports = router;