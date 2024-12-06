const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        requires: true
    }
})


module.exports = mongoose.model('Admin', adminSchema);