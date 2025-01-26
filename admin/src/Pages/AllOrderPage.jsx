import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import Order from "../Components/Order.jsx";

const AllOrderPage = () => {
  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}`;

  const [orderData, setOrderData] = useState([]);

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

    fetchAllOrder();
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

  return (
    <div className="bg-white">
      <Navbar title="All Orders" />
      <div className="mt-6">
        <div className="flex flex-wrap gap-5 h-[73vh] justify-center  overflow-y-scroll">
          {orderData.map((order) => (
            <Order
              key={order._id}
              order={order}
              markOrderAsServed={markOrderAsServed}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllOrderPage;
