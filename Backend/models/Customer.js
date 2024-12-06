const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
    },
    seatNumber: {
        type: Number
    },
    bill: {
        type: String,
        enum: ['Paid', 'Unpaid'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model('Customer', customerSchema);