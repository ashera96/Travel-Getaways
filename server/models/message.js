const mongoose = require('mongoose');

// User Schema
const messageSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        match:  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    telephone: { type: Number, required: true },
    message: { type: String, required: true }
});

module.exports = mongoose.model('Message', messageSchema);