const mongoose = require('mongoose');

// Program Schema
const programSchema = mongoose.Schema({
    title: { type: String },
    description: { type: String }
});

// Tour Schema
const tourSchema = mongoose.Schema({
    title: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    price_adult: { type: Number, required: true },
    price_child: { type: Number, required: true },
    program: [programSchema],
    tour_image: { type: String, required: true }
});

module.exports = mongoose.model('Tour', tourSchema);