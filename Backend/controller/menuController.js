const MenuCategory = require('../models/MenuCategory');

exports.allMenu = async(req,res)=>{
    let menu = await MenuCategory.find({});
    console.log(menu);
    res.send(menu);
}