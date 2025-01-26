import React, { useContext, useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import { CartContext } from "../CartContext.jsx";
import Cart from "../Components/Cart.jsx";
import Category from "../Components/Category.jsx";

const MenuPage = () => {
  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}`;

  const { cart } = useContext(CartContext);
  const [MenuCategory, setMenuCategory] = useState([]);

  useEffect(() => {
    const fetchMenuCategory = async () => {
      const url = `${backendUrl}/menu/categories`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("HTTP error ! :", response.status);
      }
      const data = await response.json();

      setMenuCategory(data.categories);
    };

    fetchMenuCategory();
  }, []);

  return (
    <div className="bg-white w-full max-w-screen-lg mx-auto px-4">
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto max-h-[80vh] max-sm:h-[70vh] pb-4">
      {MenuCategory.map((category) => (
        <Category category={category} key={category._id} />
      ))}
    </div>
      {cart.length > 0 && <Cart />}
    </div>
  );
};

export default MenuPage;
