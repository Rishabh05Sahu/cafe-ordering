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
},  { collection: 'admin' }
)


module.exports = mongoose.model('Admin', adminSchema);