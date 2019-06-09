const express = require('express');
const router = express.Router();

const Bookmark = require('../models/bookmark');

// Create bookmark
router.post('/', (req, res, next) => {
    const newBookmark = new Bookmark({
        user_id: req.body.user_id,
        tour_id: req.body.tour_id,
        tour_title: req.body.tour_title,
        tour_duration: req.body.tour_duration,
        tour_price_adult: req.body.tour_price_adult,
        tour_price_child: req.body.tour_price_child,
        tour_image: req.body.tour_image
    });
    newBookmark.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                status: 'Created bookmark successfully',
                createdBookmark : {
                    user_id: result.user_id,
                    tour_id: result.tour_id,
                    tour_title: result.tour_title,
                    tour_duration: result.tour_duration,
                    tour_price_adult: result.tour_price_adult,
                    tour_price_child: result.tour_price_child,
                    tour_image: result.tour_image
                }
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
})

// Get bookmarks
router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    Bookmark.find({'user_id':id})
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                bookmarks: docs
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

// Remove bookmark
router.delete('/:bookmarkId', (req, res, next) => {
    const id = req.params.bookmarkId;
    Bookmark.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Deleted bookmark successfully'
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