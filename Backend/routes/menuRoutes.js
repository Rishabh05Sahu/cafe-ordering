const express = require('express');
const {allMenu, menuItemsByCategory} = require('../controller/menuController');

const router = express.Router();

router.get('/all',allMenu);
router.get('/items/:categoryId',menuItemsByCategory);


module.exports = router;