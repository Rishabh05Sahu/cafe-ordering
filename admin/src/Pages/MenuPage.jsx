import React, { useState } from "react";
import logo from "../assets/logo.png";
import Sidebar from "../Components/Sidebar/Sidebar.jsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuCategory from "../Data/MenuCategory";
import itemData from "../Data/MenuItems";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const Menu = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    MenuCategory[0]?.id || ""
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [itemDialog, setItemDialog] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", imageUrl: "" });
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    imageUrl: "",
  });

  const handleCategoryClick = (category) => {
    setSelectedCategoryId(category.id);
  };

  const handleAddCategoryClick = () => {
    setDialogOpen(true);
  };
  const handleAddItemCLick=()=>{
    setItemDialog(true);
  }
  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewCategory({ name: "", imageUrl: "" });
  };
  const handleSaveCategory = () => {
    handleDialogClose();
  };

  // Filter items based on the selected category ID
  const filteredItems = itemData.filter(
    (item) => item.category === selectedCategoryId
  );

  return (
    <div className="bg-yellow-100 h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between p-4">
        <Sidebar />
        <h1 className="text-4xl font-bold">Menu</h1>
        <img
          className="h-24 rounded-full border-4 border-black"
          src={logo}
          alt="Logo"
        />
      </div>

      <div className="flex mx-16">
        {/* Left Sidebar - Categories */}
        <div className="w-1/4 bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-3">Categories</h2>
          <ul className="space-y-2">
            {MenuCategory.map((category) => (
              <li
                key={category.id}
                className={`cursor-pointer p-2 rounded-md flex items-center justify-between ${
                  selectedCategoryId === category.id
                    ? "bg-yellow-300 font-bold"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <span>{category.name}</span>
                <IconButton aria-label="delete" size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </li>
            ))}
          </ul>
          <Button
            onClick={handleAddCategoryClick}
            className="mt-5 w-full bg-green-500 text-white p-2 rounded-md"
          >
            + Add Category
          </Button>
        </div>

        {/* Right Section - Items */}
        <div className="flex-grow ml-4 bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-3">
            Items in "
            {MenuCategory.find((category) => category.id === selectedCategoryId)
              ?.name || "Selected Category"}
            "
          </h2>
          {filteredItems.length > 0 ? (
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
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">₹{item.price}</td>
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
          ) : (
            <p className="text-gray-500">
              No items available in this category.
            </p>
          )}
          <Button onClick={handleAddItemCLick} className="mt-5 w-full bg-green-500 text-white p-2 rounded-md">
            + Add Item
          </Button>
        </div>
      </div>


      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            fullWidth
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            className="mb-3"
          />
          <TextField
            label="Category Image URL"
            fullWidth
            value={newCategory.imageUrl}
            onChange={(e) =>
              setNewCategory({ ...newCategory, imageUrl: e.target.value })
            }
            className="mb-3"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveCategory} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={itemDialog} onClose={() => setItemDialog(false)}>
  <DialogTitle>Add New Item</DialogTitle>
  <DialogContent>
    <TextField
      label="Item Name"
      fullWidth
      value={newItem.name}
      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      className="mb-3"
    />
    <TextField
      label="Item Price"
      fullWidth
      value={newItem.price}
      onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
      className="mb-3"
    />
    <TextField
      label="Category"
      fullWidth
      value={newItem.category}
      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
      className="mb-3"
    />
    <TextField
      label="Description"
      fullWidth
      multiline
      value={newItem.description}
      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
      className="mb-3"
    />
    <TextField
      label="Image URL"
      fullWidth
      value={newItem.imageUrl}
      onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
      className="mb-3"
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setItemDialog(false)} color="primary">
      Cancel
    </Button>
    <Button
      onClick={() => {
        setItemDialog(false);
        // Add logic to save the item
        setNewItem({
          name: "",
          price: "",
          category: "",
          description: "",
          imageUrl: "",
        });
      }}
      color="primary"
    >
      Save
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
};

export default Menu;
