import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { CartContext } from "../CartContext.jsx";
import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Navbar from "../Components/Navbar.jsx";
import Item from "../Components/Item.jsx";
import Cart from "../Components/Cart.jsx";
import menu from "../assets/menu.svg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ItemPage = () => {
  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}`;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { seatId } = useParams();
  const { categoryId } = location.state || {};
  const { categoryName } = location.state || {};
  const [menuItem, setMenuItem] = useState([]);
  const [menuCategory, setMenuCategory] = useState([]);
  const { cart } = useContext(CartContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
    if (categoryId) {
      const fetchMenuItems = async () => {
        try {
          const response = await fetch(
            `${backendUrl}/menu/items/${categoryId}`
          );
          if (!response.ok) throw new Error("HTTP Error!");

          const data = await response.json();
          setMenuItem(data);
        } catch (error) {
          console.error("Error fetching menu items:", error);
        } finally {
          setLoading(false); 
        }
      };

      fetchMenuItems();
    }
  }, [categoryId]);

  return (
    <div className="w-3/4 mx-auto max-sm:w-[100%]">
      <Navbar title={`${categoryName}`} />

      <div className="flex flex-col gap-y-4 overflow-y-auto max-h-[80vh] items-center pb-20 w-4/5 mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-50">
            <DotLottieReact
              src="https://lottie.host/3471aa0d-da23-4dba-82a8-613adbf4820f/hIcgGOPeAu.lottie"
              loop
              autoplay
            />
          </div>
        ) : (
          menuItem.map((item) => <Item item={item} key={item._id} />)
        )}
      </div>

      {cart.length > 0 && <Cart />}

      <Button
        className="max-sm:bottom-32 max-sm:right-3 hover:scale-110 max-sm:h-14"
        sx={{
          height: "60px",
          width: "60px",
          fontSize: "36px",
          position: "absolute",
          right: "15vw",
          bottom: "5vh",
          backgroundColor: "rgb(255,82,0)",
          color: "white",
          borderRadius: "100%",
        }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <img src={menu} alt="" className="max-sm:h-12" />
      </Button>

      <Menu
        className="max-sm:h-[50vh] max-sm:w-[45vw]"
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        {menuCategory.map((category) => (
          <MenuItem
          key={category._id}
          sx={{ width: "240px" }}
          onClick={() => {
            navigate(`/seat-no/${seatId}/item`, {
              state: {
                categoryId: category._id,
                categoryName: category.name,
              },
            });
            handleClose(); 
          }}
        >
          {category.name}
        </MenuItem>
        ))}
      </Menu>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      />
    </div>
  );
};

export default ItemPage;
