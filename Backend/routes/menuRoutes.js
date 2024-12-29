const express = require('express');
const {allMenu,getAllCategories, menuItemsByCategory, addMenuCategory, addMenuItem, removeMenuCategory, removeItemById} = require('../controller/menuController');

const router = express.Router();

router.get('/all',allMenu);
router.get('/categories', getAllCategories);
router.get('/items/:categoryId',menuItemsByCategory);
router.post('/category',addMenuCategory);
router.post('/item',addMenuItem);
router.delete('/category/:categoryId',removeMenuCategory);
router.delete('/item/:itemId',removeItemById);

module.exports = router;