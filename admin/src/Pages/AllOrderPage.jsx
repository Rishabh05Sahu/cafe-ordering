import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const AllOrderPage = () => {
 
    const navigate = useNavigate();

const orders = [
    {
      id: 1,
      seatNo: "A1",
      items: [
        { name: "Coffee", quantity: 2 },
        { name: "Sandwich", quantity: 1 },
      ],
    },
    {
      id: 2,
      seatNo: "B2",
      items: [
        { name: "Burger", quantity: 1 },
        { name: "Fries", quantity: 2 },
      ],
    },
    {
      id: 3,
      seatNo: "C3",
      items: [
        { name: "Pizza", quantity: 3 },
        { name: "Pasta", quantity: 1 },
      ],
    },
    {
      id: 4,
      seatNo: "D4",
      items: [
        { name: "Juice", quantity: 2 },
      ],
    },
    {
      id: 5,
      seatNo: "E5",
      items: [
        { name: "Salad", quantity: 1 },
        { name: "Soup", quantity: 1 },
      ],
    },
    {
      id: 6,
      seatNo: "F6",
      items: [
        { name: "Ice Cream", quantity: 3 },
        { name: "Brownie", quantity: 2 },
      ],
    },
  ];

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
          {orders.map((order) => (
            <div
              onClick={()=>navigate('/seat-order')}
              style={{cursor:"pointer"}}
              key={order.id}
              className="bg-white h-44  shadow-md rounded-lg flex-col items-center justify-center p-4 border-2 border-gray-300 mx-12"
            >
              <h2 className="text-lg text-center font-semibold">Seat No: {order.seatNo}</h2>
              <div className="ml-10">
                <h3>Items:</h3>
                <ul>
                    {order.items.map((item,index)=>(
                        <li key={index}>
                            {item.name} - {item.quantity}
                        </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllOrderPage;
