import React,{useState} from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import orderData from "../Data/Order";
import itemData from "../Data/MenuItems";
import { Button } from "@mui/material";

const AllOrderPage = () => {
  const navigate = useNavigate();
  const [servedStatus, setServedStatus] = useState({});

  const toggleServedStatus = (orderId) => {
    setServedStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: !prevStatus[orderId],
    }));
  };
  

  // this function takes item id and find item name in itemData collection
  const getItemNameById = (menuItemId) => {
    const item = itemData.find(
      (menuItem) => menuItem.id === parseInt(menuItemId, 10)
    );
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
              key={order.id}
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
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {getItemNameById(item.menuItemId)} - {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Button
                onClick={()=>toggleServedStatus(order.id)}
                sx={{
                  backgroundColor: servedStatus[order.id] ? "green" : "red",
                  "&:hover": {
                    backgroundColor: servedStatus[order.id]? "darkgreen" : "darkred",
                  },
                }}
                variant="contained"
              >
                 {servedStatus[order.id] ? "Served" : "Unserved"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllOrderPage;
