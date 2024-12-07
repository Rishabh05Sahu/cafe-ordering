const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        trim: true,
        required: true
    },

},
    { collection: 'menu' }
)

module.exports = mongoose.model('Menu', menuSchema);