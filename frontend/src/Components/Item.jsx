import React, { useContext } from "react";
import { CartContext } from "../CartContext.jsx";

const Item = ({ item }) => {
  const { cart, addToCart } = useContext(CartContext);

  const handleQuantityChange = (item, action) => {
    addToCart(item, action);
  };

  return (
    <div
      key={item._id}
      style={{ border: "0.5px solid grey" }}
      className="w-[100%] border-solid border-grey  p-4 rounded-lg  flex items-start justify-between"
    >
      <img
        className="w-1/4 h-[160px] rounded-xl"
        src={item.imageUrl}
        alt={item.name}
      />
      <div className="flex flex-1 flex-col px-8  gap-y-2">
        <h2 className="font-semibold  text-lg">{item.name}</h2>
        <h3 className="font-semibold text-black">₹{item.price}</h3>
        <h5 className="text-grey">{item.description}</h5>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(item, "decrement")}
          className="bg-light_grey text-black px-4 py-2 rounded-md hover:bg-grey font-bold"
        >
          -
        </button>
        <input
          type="text"
          value={
            cart.find((cartItem) => cartItem.name === item.name)?.quantity || 0
          }
          readOnly
          className="w-12 py-2 text-center border border-gray-300 rounded-md"
        />
        <button
          onClick={() => handleQuantityChange(item, "increment")}
          className="bg-light_grey text-black px-4 py-2 rounded-md hover:bg-grey font-bold"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Item;
