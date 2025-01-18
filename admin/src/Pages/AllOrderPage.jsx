import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const AllOrderPage = () => {
  const navigate = useNavigate();
  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}`;

  const [orderData, setOrderData] = useState([]);
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    const fetchAllOrder = async () => {
      const url = `${backendUrl}/order/all-order`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("HTTP error ! :", response.status);
      }
      const result = await response.json();

      setOrderData(result.data);
    };
    const fetchAllItem = async () => {
      const url = `${backendUrl}/menu/all-item`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("HTTP error ! :", response.status);
      }
      const result = await response.json();
      console.log(result.items);
      setItemData(result.items);
    };

    fetchAllOrder();
    fetchAllItem();
  }, []);


  const markOrderAsServed = async (orderId) => {
    try {
     
      const url = `${backendUrl}/order/status/${orderId}`;
  
    
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ordrStatus: "served" }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update order status!");
      }
  
      // Update the local state to reflect the change
      setOrderData((prevData) =>
        prevData.map((order) =>
          order._id === orderId ? { ...order, ordrStatus: "served" } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };



  // this function takes item id and find item name in itemData collection
  const getItemNameById = (menuItemId) => {
    // console.log(menuItemId);
    const item = itemData.find((menuItem) => menuItem._id === menuItemId);
    return item ? item.name : "Unknown item";
  };

  return (
    <div className="bg-yellow-100 h-screen">
      <div className="flex items-center justify-between">
        <Sidebar />
        <h1 className="text-4xl">All Orders</h1>
        <img
          className="h-24 rounded-full border-4 border-black mt-5 mr-7"
          src={logo}
          alt=""
        />
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {orderData.map((order) => (
            <div
              key={order._id}
              className="bg-white h-52 shadow-md rounded-lg flex flex-col justify-between p-4 border-2 border-gray-300 mx-12"
            >
              <div
                onClick={() => navigate("/seat-order", { state: order })}
                style={{ cursor: "pointer" }}
              >
                <h2 className="text-lg text-center font-semibold">
                  Seat No: {order.seatNumber}
                </h2>
                <div className="ml-10">
                  <h3>Items:</h3>
                  <ul>
                    {order.items?.map((item, index) => {
                      const itemName = getItemNameById(item.menuItemId);
                      return (
                        <li key={index}>
                          {itemName} - {item.quantity}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {order.ordrStatus === "pending" && (
                <Button
                  onClick={() => markOrderAsServed(order._id)}
                  sx={{
                    backgroundColor: "red",
                    "&:hover": { backgroundColor: "darkred" },
                  }}
                  variant="contained"
                >
                  Mark as Served
                </Button>
              )}

              {order.ordrStatus === "served" && (
               <Button
               disabled
               sx={{
                 backgroundColor: "green", 
                 color: "white", // 
                 "&.Mui-disabled": {
                   backgroundColor: "green", 
                   color: "white", 
                 },
               }}
               variant="contained"
             >
               Served
             </Button>
             
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllOrderPage;
