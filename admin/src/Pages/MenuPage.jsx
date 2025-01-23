import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import Sidebar from "../Components/Sidebar.jsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import upload_area from "../assets/upload_area.svg";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const Menu = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [menuCategory, setMenuCategory] = useState([]);
  const [menuItems, setMenuItems] = useState([])
  const [itemData, setItemData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [itemDialog, setItemDialog] = useState(false);
  const [image, setImage] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", imageUrl: "" });
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    imageUrl: "",
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  // Fetch menu categories and items
  useEffect(() => {
    const fetchMenuCategory = async () => {
      try {
        const url = `${backendUrl}/menu/categories`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch categories.");
        }
        const result = await response.json();
        setMenuCategory(result.categories);
        if (result.categories.length > 0) {
          setSelectedCategoryId(result.categories[0]._id);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching categories.");
      }
    };

    const fetchAllItem = async () => {
      try {
        const url = `${backendUrl}/menu/all-item`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch items.");
        }
        const result = await response.json();
        setItemData(result.items);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching items.");
      }
    };

    fetchMenuCategory();
    fetchAllItem();
  }, [backendUrl]);

  const handleCategoryClick = (category) => {
    setSelectedCategoryId(category._id);
  };

  const handleAddCategoryClick = () => {
    setDialogOpen(true);
  };

  const handleAddItemClick = () => {
    setItemDialog(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewCategory({ name: "", imageUrl: "" });
  };

  const handleItemDialogClose = () => {
    setItemDialog(false);
    setNewItem({
      name: "",
      price: "",
      category: "",
      description: "",
      imageUrl: "",
    });
  };

  const handleSaveCategory = async () => {
    if (!newCategory.name || !image) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newCategory.name);
    formData.append("image", image);

    try {
      const url = `${backendUrl}/menu/category`;
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setMenuCategory((prev) => [...prev, result.category]);
        toast.success("Category added successfully!");
        setImage(false);
        handleDialogClose();
      } else {
        toast.error("Error adding category.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the category.");
    }
  };


  const handleSaveItem = async () => {
    if (!newItem.name || !newItem.price || !selectedCategoryId || !image) {
      toast.error("Please fill in all fields.");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('name', newItem.name);
      formData.append('price', newItem.price);
      formData.append('category', selectedCategoryId);
      formData.append('description', newItem.description);
      formData.append('image', image); // Append the file
  
      const response = await fetch(`${backendUrl}/menu/item`, {
        method: 'POST',
        body: formData, // Send FormData
      });
  
      if (response.ok) {
        const result = await response.json();
        setMenuItems((prev) => [...prev, result.item]);
        toast.success("Item added successfully!");
        setImage(false);
        handleItemDialogClose();
      } else {
        toast.error("Error adding item.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the item.");
    }
  };
  

  const handleRemoveCategory = async (categoryId) => {
    const url = `${backendUrl}/menu/category/${categoryId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (response.ok) {
      // Filter out the deleted category from the menuCategory state
      setMenuCategory((prev) =>
        prev.filter((category) => category._id !== categoryId)
      );

      // If the selected category is deleted, update selectedCategoryId
      if (selectedCategoryId === categoryId) {
        setSelectedCategoryId(
          menuCategory.length > 1
            ? menuCategory.find((cat) => cat._id !== categoryId)._id
            : ""
        );
      }

      toast.success("Category removed successfully!");
    } else {
      toast.error("error to remove category");
    }
  };

  const handleRemoveItem = async (itemId) => {
    const url = `${backendUrl}/menu/item/${itemId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (response.ok) {
      // Filter out the deleted item from the menuItems state
      setItemData((prev) => prev.filter((item) => item._id !== itemId));

      // Show a success toast message
      toast.success("Item removed successfully!");
    } else {
      // Show an error toast message if the deletion fails
      toast.error("Error removing item");
    }
  };

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
        <div className="w-1/4 bg-white p-4 shadow-md rounded-lg ">
          <h2 className="text-2xl font-semibold mb-3">Categories</h2>
          <ul className="space-y-2">
            {menuCategory.map((category) => (
              <li
                key={category._id}
                className={`cursor-pointer p-2 rounded-md flex items-center justify-between ${
                  selectedCategoryId === category._id
                    ? "bg-yellow-300 font-bold"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <span>{category.name}</span>
                <IconButton
                  onClick={() => handleRemoveCategory(category._id)}
                  aria-label="delete"
                  size="small"
                >
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
            {menuCategory.find(
              (category) => category._id === selectedCategoryId
            )?.name || "Selected Category"}
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
                  <tr key={item._id} className="hover:bg-gray-100">
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">₹{item.price}</td>
                    <td className="border p-2">{item.description}</td>
                    <td className="border p-2 text-center">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                      >
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
          <Button
            onClick={handleAddItemClick}
            className="mt-5 w-full bg-green-500 text-white p-2 rounded-md"
          >
            + Add Item
          </Button>
        </div>
      </div>

      {/* Add Category Dialog */}
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
          <div >
            <label htmlFor="file-input">
              <img
                src={image ? URL.createObjectURL(image) : upload_area}
                className="addproduct-thumbnail-img"
                alt="Category Preview"
              />
            </label>
            <input
              onChange={imageHandler}
              type="file"
              name="image"
              id="file-input"
              hidden
            />
          </div>
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

      {/* Add Item Dialog */}
      <Dialog open={itemDialog} onClose={handleItemDialogClose}>
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
            label="Description"
            fullWidth
            multiline
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
            className="mb-3"
          />
          {/* <TextField
            label="Image URL"
            fullWidth
            value={newItem.imageUrl}
            onChange={(e) =>
              setNewItem({ ...newItem, imageUrl: e.target.value })
            }
            className="mb-3"
          /> */}
            <div >
            <label htmlFor="file-input">
              <img
                src={image ? URL.createObjectURL(image) : upload_area}
                className="addproduct-thumbnail-img"
                alt="Category Preview"
              />
            </label>
            <input
              onChange={imageHandler}
              type="file"
              name="image"
              id="file-input"
              hidden
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleItemDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveItem} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default Menu;
