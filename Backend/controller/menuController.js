const Menu = require('../models/MenuCategory');
const Items = require('../models/MenuItem');


exports.allMenu = async(req,res)=>{
    let menu = await Menu.find({});
    
    res.send(menu);
}


exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Menu.find({});
        return res.status(200).json({
            success: true,
            categories,
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};


exports.menuItemsByCategory = async(req,res)=>{
    const {categoryId} = req.params;

    const menuItems = await Items.find({category:categoryId});
    res.json(menuItems);
  
}

exports.addMenuCategory =async(req,res)=>{
    const {name, imageUrl} = req.body;

    if(!name || !imageUrl){
        return res.status(400).json({
            success: false,
            message: 'name and image are required'
        });
    }

    try {
        const newCategory = new Menu({name , imageUrl});
        await newCategory.save();

        return res.status(201).json({
            success: true,
            message:' new category added',
            category: newCategory
        })
    } catch (error) {
        console.error("Error adding menu category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}


exports.addMenuItem = async (req, res) => {
    const { name, price, category, description, imageUrl } = req.body;

    if (!name || !price || !category || !imageUrl) {
        return res.status(400).json({
            success: false,
            message: "Name, price, category, and image URL are required.",
        });
    }

    try {
        const newItem = new Items({ name, price, category, description, imageUrl });
        await newItem.save();

        return res.status(201).json({
            success: true,
            message: "Menu item added successfully!",
            item: newItem,
        });
    } catch (error) {
        console.error("Error adding menu item:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};


exports.removeMenuCategory = async(req,res)=>{
    try {
        const {categoryId} = req.params;

        const category = await Menu.findById(categoryId);

        if(!categoryId){
            return res.status(404).json({
                succes: false,
                message: "Menu category not found"
            })
        }

        //removing all item related to this category
        await Items.deleteMany({category:categoryId});

        //removeing the catetgory
        await Menu.findByIdAndDelete(categoryId);

        res.status(200).json({
            success: true,
            message: "menu category and related items removed"
        })

    } catch (error) {
        console.error("error removing menu category: ", error);
        res.status(500).json({
            succes: false,
            message: " Internal server error"
        })
    }
}


exports.removeItemById =async (req,res)=>{
    try {
        const {itemId} = req.params;
        
        const item = Items.findById(itemId);
        if(!item){
            return res.status(404).json({
                succes: false,
                message: "Item not found"
            })
        }

        //deleteing the item
        await Items.findByIdAndDelete(itemId);
        res.status(200).json({
            succes: true,
            message:"item deleted successfully"
        })

    } catch (error) {
        console.error("Error removing item: ", error);
        res.status(500).json({
            success: false,
            message:"Internal server error"
        });
    }
}