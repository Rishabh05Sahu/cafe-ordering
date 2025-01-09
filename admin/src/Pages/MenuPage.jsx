import React, { useState } from "react";
import logo from "../assets/logo.png";
import Sidebar from "../Components/Sidebar/Sidebar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const Menu = () => {
  const [categories, setCategories] = useState([
    "Starters",
    "Main Course",
    "Beverages",
    "Desserts",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Starters");
  const [items, setItems] = useState([
    {
      id: 1,
      name: "French Fries",
      price: "5.00",
      description: "Crispy golden fries",
    },
    { id: 2, name: "Garlic Bread", price: "4.50", description: "Cheesy bread" },
  ]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // In real implementation, fetch items for this category here.
  };
  return (
    <div className="bg-yellow-100 h-screen ">
      <div className="flex items-center justify-between">
        <Sidebar />
        <h1 className="text-4xl">Menu</h1>
        <img
          className="h-24 rounded-full border-4 border-black mt-5 mr-7"
          src={logo}
          alt=""
        />
      </div>
      <div className="flex">
        {/* left part */}
        <div className="w-1/4 bg-white p-4 shadow-md rounded-lg flex-col">
          <h2 className="text-2xl font-semibold mb-3">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li
                key={index}
                className={`cursor-pointer p-2 rounded-md flex items-center justify-between ${
                  selectedCategory === category
                    ? "bg-yellow-300 font-bold"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <span>{category}</span>
                <IconButton aria-label="delete" size="large" >
                  <DeleteIcon  fontSize="inherit" />
                </IconButton>
              </li>
            ))}
          </ul>
          <button className="mt-5 w-full bg-green-500 text-white p-2 rounded-md">
            + Add Category
          </button>
        </div>

        {/* right part */}
        <div className="flex-grow ml-5 bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-3">
              Items in "{selectedCategory}"
            </h2>
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-yellow-300">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">${item.price}</td>
                    <td className="border p-2">{item.description}</td>
                    <td className="border p-2 text-center">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded-md">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="mt-5 w-full bg-green-500 text-white p-2 rounded-md">
              + Add Item
            </button>
          </div>
      </div>
    </div>
  );
};

export default Menu;
