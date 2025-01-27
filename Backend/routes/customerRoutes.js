const express = require('express');
const {addCustomer,sendOtp,verifyOtp} = require('../controller/customerController');

const router = express.Router();

router.post("/addcustomer",addCustomer);

module.exports = router;