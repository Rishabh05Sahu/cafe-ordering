import  { useContext,useState } from "react";
import { CartContext } from "../CartContext.jsx";
import { motion } from "motion/react"

const Item = ({ item }) => {
  const { cart, addToCart } = useContext(CartContext);

  const handleQuantityChange = (item, action) => {
    addToCart(item, action);
  };

  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div
      key={item._id}
      style={{ border: "0.5px solid grey" }}
      className="w-[100%] border-solid border-grey  p-4 rounded-lg  flex items-start justify-between  "
    >
      <img
        className="w-1/4 h-[160px] max-sm:h-[100px] rounded-xl"
        src={item.imageUrl}
        alt={item.name}
      />
      <div className="flex flex-1 flex-col px-8  gap-y-2 max-sm:pl-4 max-sm:pr-1  max-sm:gap-y-0">
        <h2 className="font-semibold  text-lg max-sm:text-sm">{item.name}</h2>
        <h3 className="font-semibold text-black max-sm:text-xs">
          ₹{item.price}
        </h3>
        <h5 className="text-grey max-sm:text-xs">
          {isReadMore
            ? item.description
            : `${item.description.slice(0, 17)}...`}
        </h5>
        <button 
        onClick={toggleReadMore} 
        className="text-orange text-start text-sm max-sm:text-xs"
      >
        {isReadMore ? 'Read Less' : 'Read More'}
      </button>
      </div>
      <div className="flex items-center gap-2 max-sm:gap-1">
        <motion.button
        whileTap={{scale:0.9}}
          onClick={() => handleQuantityChange(item, "decrement")}
          className="bg-light_grey text-black px-4 py-2 rounded-md hover:bg-grey font-bold max-sm:px-2 max-sm:py-0"
        >
          -
        </motion.button>
        <input
          type="text"
          value={
            cart.find((cartItem) => cartItem.name === item.name)?.quantity || 0
          }
          readOnly
          className="w-12 py-2 text-center border border-gray-300 rounded-md max-sm:py-0 max-sm:w-6"
        />
        <motion.button
        whileTap={{scale:0.9}}
          onClick={() => handleQuantityChange(item, "increment")}
          className="bg-light_grey text-black px-4 py-2 rounded-md hover:bg-grey font-bold max-sm:px-2 max-sm:py-0"
        >
          +
        </motion.button>
      </div>
    </div>
  );
};

export default Item;
