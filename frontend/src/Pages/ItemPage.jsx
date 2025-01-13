import React, { useState, useContext } from "react";
import logo from "../assets/logo.png";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import itemData from "../Data/MenuItems";
import { CartContext } from "../CartContext.jsx";
import { Button } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuButton from "../Components/MenuButton/MenuButton.jsx";

const ItemPage = () => {
  const navigate = useNavigate();
  const { cart, addToCart, calculateTotal } = useContext(CartContext);

  

  const handleQuantityChange = (item, action) => {
    addToCart(item, action); // Update cart using the context function
  };
  return (
    <div className="bg-yellow-100 h-screen">
      <div className="flex items-center justify-around gap-96 pt-5 ">
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon fontSize="large" style={{ fontWeight: "bold" }} />
        </IconButton>
        <h1 className="font-bold font-sans text-4xl">Item</h1>
        <img
          className="h-24 rounded-full border-4 border-black"
          src={logo}
          alt=""
        />
      </div>
      <div className="flex-col overflow-y-auto max-h-[500px] ">
        {itemData.map((item) => (
          <div
            key={item.id}
            className="bg-yellow-100 w-3/4 h-30 border-2 border-solid border-black p-4 rounded-lg  flex items-center justify-between mt-4 ml-32"
          >
            <img className="h-28 w-1/6" src={item.imageUrl} alt={item.name} />
            <div className="flex-1 px-4">
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <h3 className="font-semibold">Price:{item.price}</h3>
              <h5>{item.description}</h5>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(item, "decrement")}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                -
              </button>
              <input
                type="text"
                value={
                  cart.find((cartItem) => cartItem.name === item.name)
                    ?.quantity || 0
                }
                readOnly
                className="w-12 text-center border border-gray-300 rounded-md"
              />
              <button
                onClick={() => handleQuantityChange(item, "increment")}
                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
              >
                +
              </button>
            </div>
          </div>
        ))}
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
      <Button
      className="absolute right-24"
        sx={{
          borderRadius: "100%",
          height: "7.1vh",
          width: "7vh",
          fontSize: "3.5vh",
        }}
        variant="contained"
      >
        +
      </Button>
    </div>
  );
};

export default ItemPage;


