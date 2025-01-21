import React, { useContext,useState, useEffect } from "react";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../CartContext.jsx";
import Navbar from "../Components/Navbar/Navbar.jsx";

const MenuPage = () => {
  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}`
  
  const navigate = useNavigate();
  const { cart, calculateTotal } = useContext(CartContext);
  const [MenuCategory, setMenuCategory] = useState([])
  const { seatId } = useParams();
  useEffect(() => {
    
    const fetchMenuCategory = async()=>{
      const url = `${backendUrl}/menu/categories`;
      
      const response = await fetch(url);

      if(!response.ok){
        throw new Error('HTTP error ! :', response.status);
      }
      const data =await response.json();
     
      setMenuCategory(data.categories);
    }
  
    fetchMenuCategory()
  }, [])
  

  return (
    <div className="bg-yellow-100 h-screen">
    
      <div>
        <ImageList
          className="ml-52 pt-6 "
          sx={{ width: "70%", height: 510,opacity:"0.9" }}
          cols={3}
          gap={16}
          rowHeight={260}
        >
          {MenuCategory.map((item) => (
            <ImageListItem
              key={item._id}
              onClick={() => navigate(`/seat-no/${seatId}/item`,{ state: { categoryId: item._id } })}
              style={{ cursor: "pointer", border:'2px solid black', padding:'18px',borderRadius:'4%', height:'53%',width:'95%' }}
            >
             
              <img
                className="rounded-md "
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
          onClick={() => navigate(`/seat-no/${seatId}/place-order`)}
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
