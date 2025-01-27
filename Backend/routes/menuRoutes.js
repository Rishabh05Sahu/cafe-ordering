const express = require('express');
const {allMenu, getAllItem,getAllCategories, menuItemsByCategory, addMenuCategory, addMenuItem, removeMenuCategory, removeItemById} = require('../controller/menuController');
const upload = require('../middleware/upload')
const router = express.Router();

router.get('/all',allMenu);
router.get('/all-item',getAllItem);
router.get('/categories', getAllCategories);
router.get('/items/:categoryId',menuItemsByCategory);
router.post('/category',upload.single("imageUrl"),addMenuCategory);
router.post('/item',upload.single('imageUrl'),addMenuItem);
router.delete('/category/:categoryId',removeMenuCategory);
router.delete('/item/:itemId',removeItemById);

module.exports = router;