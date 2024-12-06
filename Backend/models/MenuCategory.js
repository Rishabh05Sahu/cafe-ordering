const mongoose = require('mongoose');

const menuCategorySchema = new mongoose.Schema({
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
    { collection: 'menuCategory' }
)

module.exports = mongoose.model('MenuCategory', menuCategorySchema);