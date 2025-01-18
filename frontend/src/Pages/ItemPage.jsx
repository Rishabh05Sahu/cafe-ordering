import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { CartContext } from "../CartContext.jsx";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ItemPage = () => {
  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}`;
  const navigate = useNavigate();
  const location = useLocation();
  const {seatId} = useParams();
  const { categoryId } = location.state || {};
  const [menuItem, setMenuItem] = useState([]);
  const [menuCategory, setMenuCategory] = useState([]);
  const { cart, addToCart, calculateTotal } = useContext(CartContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleQuantityChange = (item, action) => {
    addToCart(item, action);
  };

  useEffect(() => {
    //  fetch categories
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

  useEffect(() => {
    // fetching items
    if (categoryId) {
      const fetchMenuItems = async () => {
        const url = `${backendUrl}/menu/items/${categoryId}`;
        console.log("Fetching from URL:", url);
  
        try {
          const response = await fetch(url);
  
          if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          console.log("Fetched Data:", data);
          setMenuItem(data);
        } catch (error) {
          console.error("Error fetching menu items:", error.message);
        }
      };
  
      fetchMenuItems();
    }
  }, [categoryId]); 
  

  return (
    <div className="bg-yellow-100 h-screen">
     
      <div className="flex-col overflow-y-auto max-h-[500px] ">
        {menuItem.map((item) => (
          <div
            key={item._id}
            className="bg-yellow-100 w-3/4 h-30 border-2 border-solid border-black p-4 rounded-lg  flex items-center justify-between mt-4 ml-32"
          >
            <img className="h-28 w-1/6 rounded-xl" src={item.imageUrl} alt={item.name} />
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
          onClick={() => navigate(`/seat-no/${seatId}/place-order`)}
          style={{ cursor: "pointer" }}
          className="flex-col place-items-center bg-red-300 rounded-lg w-1/3 m-auto mt-6 p-3 "
        >
          <p className="text-xl"> {cart.length} item(s) added </p>
          <p>Total Order: ₹{calculateTotal()}</p>
        </div>
      )}
      <Button
        sx={{
          height: "7.5vh",
          fontSize: "4vh",
          position: "absolute",
          right: "10vw",
          bottom: "10vh",
          backgroundColor: "black",
          color: "white",
          borderRadius: "100%",
        }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        +
      </Button>

      <Menu
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuCategory.map((category) => (
          <MenuItem key={category._id} 
          onClick={() => navigate(`/seat-no/${seatId}/item`,{ state: { categoryId: category._id } })}>
            {category.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ItemPage;
