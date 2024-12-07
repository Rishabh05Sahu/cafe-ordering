const Menu = require('../models/MenuCategory');
const Items = require('../models/MenuItem')


exports.allMenu = async(req,res)=>{
    let menu = await Menu.find({});
    
    res.send(menu);
}

exports.menuItemsByCategory = async(req,res)=>{
    const {categoryId} = req.params;

    const menuItems = await Items.find({category:categoryId});
    res.json(menuItems);
    console.log(menuItems);
}