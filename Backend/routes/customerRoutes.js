const express = require('express');
const {addCustomer} = require('../controller/customerController');

const router = express.Router();

router.post("/addcustomer",addCustomer);

module.exports = router;