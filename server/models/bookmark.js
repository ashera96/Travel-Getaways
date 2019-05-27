const mongoose = require('mongoose');

// Bookmark Schema
const bookmarkSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    tour_id: { type: String, required: true },
    tour_title: { type: String, required: true },
    tour_duration: { type: String, required: true },
    tour_price_adult: { type: Number, required: true },
    tour_price_child:{ type: Number, required: true }
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);