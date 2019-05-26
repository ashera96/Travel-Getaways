const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('File type not acceptable'), false);
    }
};

const upload = multer({
    storage: storage, 
    // limits: {
    //     fileSize: 1024*1024*5
    // },
    // fileFilter: fileFilter
});

const Tour = require('../models/tour');

// Storing the tour created by admin
router.post('/', (req, res, next) => {
    const newTour = new Tour({
        title: req.body.title,
        duration: req.body.duration,
        description: req.body.description,
        city: req.body.city,
        address: req.body.address,
        price_adult: req.body.price_adult,
        price_child: req.body.price_child,
        program: req.body.program,
        tour_image: req.body.tour_image
    });
    newTour.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                status: 'Created tour successfully',
                createdTour: {
                    _id: result.id,
                    title: result.title,
                    duration: result.duration,
                    description: result.description,
                    city: result.city,
                    address: result.address,
                    price_adult: result.price_adult,
                    price_child: result.price_child,
                    program: result.program,
                    tour_image: result.tour_image 
                }
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
});

// Storing the tour related image
router.post('/uploadimage', upload.single('tour_image'));
// Same name image not gettting uploaded??

// Retireve tours
router.get('/', (req, res, next) => {
    Tour.find()
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

// Load a given tour
router.get('/:tourId', (req, res, next) => {
    const id = req.params.tourId;
    Tour.findById(id)
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

// Update tour
router.patch('/:tourId', (req, res, next) => {
    const id = req.params.tourId;
    Tour.update({_id: id}, { $set: req.body })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Tour updated'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// Delete tour
router.delete('/:tourId', (req, res, next) => {
    const id = req.params.tourId;
    Tour.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Deleted tour successfully'
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