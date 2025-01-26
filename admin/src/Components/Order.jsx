import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const Order = ({ order, markOrderAsServed }) => {
  const navigate = useNavigate();
  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}`;
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    const fetchAllItem = async () => {
      const url = `${backendUrl}/menu/all-item`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("HTTP error ! :", response.status);
      }
      const result = await response.json();

      setItemData(result.items);
    };

    fetchAllItem();
  }, []);

  const getItemNameById = (menuItemId) => {
    const item = itemData.find((menuItem) => menuItem._id === menuItemId);
    return item ? item.name : "Unknown item";
  };

  return (
    <div
      key={order._id}
      className="flex flex-col  border-2 border-grey rounded-3xl pt-4 px-12 h-[33vh] w-[22%]"
    >
      <div className="h-[25vh] overflow-y-scroll" onClick={() => navigate("/seat-order", { state: order })}>
        <h2 className="text-xl text-bold text-black sticky top-0 ">
          Seat No: {order.seatNumber}
        </h2>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-grey ">Items:</h3>
          <ul className="list-disc overflow-y-auto h-2/3 pb-6">
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

      {order.ordrStatus === "pending" ? (
        <Button
          onClick={() => markOrderAsServed(order._id)}
          className="bg-orange rounded-2xl "
          variant="contained"
        >
          Mark as Served
        </Button>
      ) : (
        <Button
          disabled
          className="bg-dark_green rounded-2xl "
          variant="contained"
        >
          Served
        </Button>
      )}
    </div>
  );
};

export default Order;
