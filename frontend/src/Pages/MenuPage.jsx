import React, { useContext } from "react";
import logo from "../assets/logo.png";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useNavigate } from "react-router-dom";
import MenuCategory from "../Data/MenuCategory";
import { CartContext } from "../CartContext.jsx";

const MenuPage = () => {
  const navigate = useNavigate();
  const { cart, calculateTotal } = useContext(CartContext);

  return (
    <div className="bg-yellow-100 h-screen">
      <div className="flex items-center justify-end gap-96 pt-5 mr-20">
        <h1 className="font-bold font-sans text-4xl">YOUR CAFE NAME</h1>
        <img
          className="h-24 rounded-full border-4 border-black"
          src={logo}
          alt=""
        />
      </div>
      <div>
        <ImageList
          className="ml-52 mt-8"
          sx={{ width: "70%", height: 510 }}
          cols={3}
          gap={16}
          rowHeight={260}
        >
          {MenuCategory.map((item) => (
            <ImageListItem
              key={item.id}
              onClick={() => navigate("/item")}
              style={{ cursor: "pointer" }}
            >
             
              <img
                srcSet={`${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
                alt={item.name}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.name}
                position="below"
                sx={{
                  textAlign: "center",
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      {cart.length > 0 && (
        <div
          onClick={() => navigate("/place-order")}
          style={{ cursor: "pointer" }}
          className="flex-col place-items-center bg-red-300 rounded-lg w-1/3 m-auto mt-6 p-3 "
        >
          <p className="text-xl"> {cart.length} item(s) added </p>
          <p>Total Order: ₹{calculateTotal()}</p>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
