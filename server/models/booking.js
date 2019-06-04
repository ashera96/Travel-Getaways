const mongoose = require('mongoose');

const dateSchema = mongoose.Schema({
    year: { type: Number },
    month: { type: Number },
    day: { type: Number }
});

const bookingSchema = mongoose.Schema({
    dp: [dateSchema],
    tour_title: { type: String, required: true },
    adults: { type: Number, required: true },
    children: { type: Number, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);