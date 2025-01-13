// itemDummyData.js
import burger from '../assets/burger.png'

const itemData = [
    {   id: 1  ,
        name: "Grilled Chicken",
        price: 250,
        category: 2, // Replace with actual Menu ObjectId for "Main Course"
        description: "Juicy grilled chicken served with a side of vegetables.",
        imageUrl: burger
    },
    {   id:2,
        name: "Spring Rolls",
        price: 120,
        category: 1, // Replace with actual Menu ObjectId for "Appetizers"
        description: "Crispy spring rolls filled with fresh vegetables and spices.",
        imageUrl: burger
    },
    {   id:3,
        name: "Chocolate Cake",
        price: 150,
        category: 3, // Replace with actual Menu ObjectId for "Desserts"
        description: "Rich and moist chocolate cake topped with creamy frosting.",
        imageUrl: burger
    },
    {   id:4,
        name: "Mojito",
        price: 100,
        category: 1, // Replace with actual Menu ObjectId for "Beverages"
        description: "Refreshing mint and lime beverage to cool you down.",
        imageUrl: burger
    }
];

export default itemData;
