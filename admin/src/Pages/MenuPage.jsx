import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import Categories from "../Components/Categories.jsx";
import Items from "../Components/Items.jsx";

const Menu = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [menuCategory, setMenuCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

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
    fetchMenuCategory();
  }, [backendUrl]);

  return (
    <div className="bg-white flex flex-col    ">
      <Navbar  title="Menu" />
      <div className="flex gap-14 ml-[8%]  w-5/6 ">
  
           <Categories
          menuCategory={menuCategory}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          setMenuCategory={setMenuCategory}
        />
        <Items
          selectedCategoryId={selectedCategoryId}
          menuCategory={menuCategory}
        />
      </div>
    </div>
  );
};

export default Menu;
