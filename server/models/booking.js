const mongoose = require('mongoose');

const dateSchema = mongoose.Schema({
    year: { type: Number },
    month: { type: Number },
    day: { type: Number }
});

const bookingSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    tour_id: { type: String, required: true },
    dp: [dateSchema],
    tour_title: { type: String, required: true },
    adults: { type: Number, required: true },
    children: { type: Number, required: false },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);