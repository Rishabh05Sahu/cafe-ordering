const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    seatNo:{
        type: Number,
        required: true,
        unique: true
    },
    qrLink:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Tabel',tableSchema);