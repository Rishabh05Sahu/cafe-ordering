import React, { useState } from "react";
import logo from "../assets/logo.png";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const ItemPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Burger",
      img: "https://via.placeholder.com/50",
      quantity: 0,
    },
    {
      id: 2,
      name: "Pizza",
      img: "https://via.placeholder.com/50",
      quantity: 0,
    },
    {
      id: 3,
      name: "Fries",
      img: "https://via.placeholder.com/50",
      quantity: 0,
    },
    { id: 4, name: "Soda", img: "https://via.placeholder.com/50", quantity: 0 },
  ]);

  const handleQuantityChange = (id, action) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === "increment"
                  ? item.quantity + 1
                  : Math.max(item.quantity - 1, 0),
            }
          : item
      )
    );
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
      <div className="flex-col ">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-yellow-100 w-3/4 border-2 border-solid border-black p-4 rounded-lg  flex items-center justify-between mt-4 ml-32"
          >
            <img src={item.img} alt={item.name} />
            <div className="flex-1 px-4">
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <h3 className="font-semibold">Price:100</h3>
              <h5>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Facilis, iure.
              </h5>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(item.id, "decrement")}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                -
              </button>
              <input
                type="text"
                value={item.quantity}
                readOnly
                className="w-12 text-center border border-gray-300 rounded-md"
              />
              <button
                onClick={() => handleQuantityChange(item.id, "increment")}
                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        onClick={() => navigate("/place-order")}
        style={{ cursor: "pointer" }}
        className="flex-col place-items-center bg-red-300 rounded-lg w-1/3 m-auto mt-6 p-3 "
      >
        <p className="text-xl"> 1 item added </p>
        <p>total order 500</p>
      </div>
    </div>
  );
};

export default ItemPage;
