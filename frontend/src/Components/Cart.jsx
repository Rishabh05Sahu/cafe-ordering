import React, { useContext } from "react";
import { CartContext } from "../CartContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react"
const Cart = () => {
  const navigate = useNavigate();
  const { seatId } = useParams();
  const { cart, calculateTotal } = useContext(CartContext);

  return (
    <motion.div
      whileHover={{scale:1.1}}
      whileTap={{scale:0.9}}
      onClick={() => navigate(`/seat-no/${seatId}/place-order`)}
      style={{ cursor: "pointer" }}
      className="absolute z-50 bottom-0 left-[32vw] flex flex-col space-y-2 w-fit bg-orange text-white rounded-xl py-4 px-48 max-sm:py-2 max-sm:space-y-1 max-sm:px-20 items-center max-sm:h-[10vh] max-sm:bottom-5 max-sm:left-6"
    >
      <p className="text-xl "> {cart.length} item(s) added </p>
      <p>Total Order: ₹{calculateTotal()}</p>
    </motion.div>
  );
};

export default Cart;
