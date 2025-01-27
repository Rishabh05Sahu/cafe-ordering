const express =require('express');
const {verifyOtp,sendOtp ,placeOrder,allOrder, updateBillStatus, updateOrderStatus} = require('../controller/orderController');


const router = express.Router();


router.post('/place',placeOrder);
router.get('/all-order',allOrder);
router.patch('/status/:orderId',updateOrderStatus);
router.patch('/bill/:orderId',updateBillStatus);

module.exports = router;