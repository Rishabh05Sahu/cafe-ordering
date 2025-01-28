import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import upload_area from "../assets/upload_area.svg";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
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
  const [previewUrl, setPreviewUrl] = useState(upload_area);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    imageUrl: null,
  });

  const fileHandler = (e) => {
    const file = e.target.files[0];

    setNewItem({
      ...newItem,
      imageUrl: file,
    });
    setPreviewUrl(URL.createObjectURL(file));
  };

  const uploadFile = async () => {
    if (!newItem.imageUrl) return "";

    const formData = new FormData();
    formData.append("image", newItem.imageUrl);

    try {
      const response = await fetch(`${backendUrl}/uploads`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        return result.imageUrl;
      } else {
        alert("Failed to upload file.");
        return "";
      }
    } catch (error) {
      console.error("File upload error:", error);
      return "";
    }
  };

  const handleSaveItem = async () => {
    const image = await uploadFile();
    console.log("image url:", image);
    if (!newItem.name || !newItem.price || !selectedCategoryId || !image) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (isNaN(newItem.price) || newItem.price <= 0) {
      toast.error("Price must be a positive number.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newItem.name);
      formData.append("price", newItem.price);
      formData.append("category", selectedCategoryId);
      formData.append("description", newItem.description);
      formData.append("imageUrl", image);

      const response = await fetch(`${backendUrl}/menu/item`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setItemData((prev) => [...prev, result.item]);
        toast.success("Item added successfully!");
        handleItemDialogClose();
      } else {
        toast.error("Error adding item.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the item.");
    }
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
        setItemData(result.items || []);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching items. Please try again later.");
      }
    };

    fetchAllItem();
  }, [backendUrl]);

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
              <th className="border p-2"></th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item._id} className="hover:bg-gray-100">
                <img className="mx-auto border p-2  h-20"  src={item.imageUrl} alt="" />
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">₹{item.price}</td>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2 text-center">
               
                  <IconButton
                    sx={{ color: "red", padding:'10px' }}
                    onClick={() => handleRemoveItem(item._id)}
                    aria-label="delete"
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
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
          <div>
            {/* <label htmlFor="file-input">
              <img
                src={image ? URL.createObjectURL(image) : upload_area}
                className="addproduct-thumbnail-img"
                alt={image ? "Image Preview" : "Upload Area"}
                onError={(e) => (e.target.src = upload_area)} // Fallback image
              />
            </label>
            <input
              onChange={imageHandler}
              type="file"
              name="image"
              id="file-input"
              hidden
            /> */}
            <label htmlFor="file-input">
              <img
                src={previewUrl}
                className="addnote-thumbnail-img"
                alt="Preview"
              />
            </label>
            <input
              onChange={fileHandler}
              type="file"
              name="note_file"
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
