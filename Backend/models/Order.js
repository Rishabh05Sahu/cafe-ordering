const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    seatNumber: {
        type: Number,
        required: true
    },
    items: [
        {
            menuItemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'MenuItem',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            _id: false, // Disable _id for subdocuments
        },
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    // order status or bill status
    ordrStatus: {
        type: String,
        enum: ['pending', 'served'],
        default: 'pending'
    },
    billStatus: {
        type: String,
        enum: ['Paid', 'Unpaid'],
        default: 'Unpaid'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: 'order',

}
);


module.exports = mongoose.model('Order', orderSchema);