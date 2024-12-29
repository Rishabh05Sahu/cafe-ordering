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
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

},  { collection: 'customer' }
);


module.exports = mongoose.model('Customer', customerSchema);