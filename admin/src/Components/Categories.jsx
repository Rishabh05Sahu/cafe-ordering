import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import upload_area from "../assets/upload_area.svg";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const Categories = ({
  menuCategory,
  selectedCategoryId,
  setSelectedCategoryId,
  setMenuCategory,
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [newCategory, setNewCategory] = useState({ name: "", imageUrl: "" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [image, setImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(upload_area);

  const fileHandler = (e) => {
    // setImage(e.target.files[0]);
    const file = e.target.files[0];

    setNewCategory({
      ...newCategory,
      imageUrl: file,
    });
    setPreviewUrl(URL.createObjectURL(file));
  };

  const uploadFile = async () => {
    if (!newCategory.imageUrl) return "";

    const formData = new FormData();
    formData.append("image", newCategory.imageUrl);

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

  const handleCategoryClick = (category) => {
    setSelectedCategoryId(category._id);
  };

  const handleAddCategoryClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewCategory({ name: "", imageUrl: "" });
  };

  const handleSaveCategory = async () => {
    const image = await uploadFile();
    if (!newCategory.name || !image) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newCategory.name);
      formData.append("imageUrl", image);

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

  return (
    <div className="w-1/3 bg-white  shadow-md rounded-3xl flex flex-col h-[75vh] overflow-y-scroll  items-center border-double border-2 border-black">
      <h2 className="text-2xl sticky top-3 font-semibold my-3">Categories</h2>
      <ul className="space-y-2 w-5/6">
        {menuCategory.map((category) => (
          <li
            key={category._id}
            className={`cursor-pointer p-3 rounded-xl flex items-center justify-between  ${
              selectedCategoryId === category._id
                ? "bg-light_orange font-bold"
                : "hover:bg-gray-200"
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            <span>{category.name}</span>
            <IconButton
              sx={{ color: "red" }}
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
        className="mt-5 sticky bottom-3 font-mono text-base bg-orange text-white py-4 my-3 w-5/6 rounded-3xl"
      >
        + Add Category
      </Button>

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
          <div>
            <label htmlFor="file-input">
              <img
                 src={previewUrl}
                className="addproduct-thumbnail-img"
                alt="Category Preview"
              />
            </label>
            <input
              onChange={fileHandler}
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

      <ToastContainer />
    </div>
  );
};

export default Categories;
