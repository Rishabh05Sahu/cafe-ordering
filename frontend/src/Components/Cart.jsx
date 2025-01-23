import React, { useContext } from "react";
import { CartContext } from "../CartContext.jsx";
import { useNavigate, useParams } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { seatId } = useParams();
  const { cart, calculateTotal } = useContext(CartContext);

  return (
    <div
      onClick={() => navigate(`/seat-no/${seatId}/place-order`)}
      style={{ cursor: "pointer" }}
      className="absolute z-50 bottom-0 left-[32vw] flex flex-col space-y-2 w-fit bg-orange text-white rounded-xl py-4 px-48 items-center"
    >
      <p className="text-xl"> {cart.length} item(s) added </p>
      <p>Total Order: ₹{calculateTotal()}</p>
    </div>
  );
};

export default Cart;
