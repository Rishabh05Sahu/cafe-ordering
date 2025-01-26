import React, { useEffect, useState } from "react";
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

const Items = ({ selectedCategoryId, menuCategory }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [menuItems, setMenuItems] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [itemDialog, setItemDialog] = useState(false);
  const [image, setImage] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    imageUrl: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
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

    fetchAllItem();
  }, [backendUrl]);

  const handleSaveItem = async () => {
    if (!newItem.name || !newItem.price || !selectedCategoryId || !image) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", newItem.name);
      formData.append("price", newItem.price);
      formData.append("category", selectedCategoryId);
      formData.append("description", newItem.description);
      formData.append("image", image); // Append the file

      const response = await fetch(`${backendUrl}/menu/item`, {
        method: "POST",
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

  const handleAddItemClick = () => {
    setItemDialog(true);
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

  return (
    <div className="flex flex-col w-full p-4 shadow-md  border-2 border-black  border-double rounded-3xl items-center">
      <h2 className="text-2xl font-semibold mb-3">
        Items in "
        {menuCategory.find((category) => category._id === selectedCategoryId)
          ?.name || "Selected Category"}
        "
      </h2>
      {filteredItems.length > 0 ? (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-light_orange">
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
                  <button className="bg-blue-400 text-white px-2 py-1 rounded-md mr-2">
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
        <p className="text-gray-500">No items available in this category.</p>
      )}
      <Button
        onClick={handleAddItemClick}
        className="mt-5 w-5/6 bg-orange font-mono text-base  text-white p-2 rounded-3xl"
      >
        + Add Item
      </Button>

      {/* Add Item Dialog */}
      <Dialog open={itemDialog} onClose={handleItemDialogClose} >
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent >
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
          <div>
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

export default Items;
