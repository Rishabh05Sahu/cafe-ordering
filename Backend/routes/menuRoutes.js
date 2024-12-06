const express = require('express');
const {allMenu} = require('../controller/menuController');

const router = express.Router();

router.get('/all',allMenu);


module.exports = router;