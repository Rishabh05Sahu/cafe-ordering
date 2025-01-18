import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

const SeatOrderPage = () => {
  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}`;
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state;
  const [itemData, setItemData] = useState([]);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const url = `${backendUrl}/menu/all-item`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("HTTP Error", response.status);
        }
        const data = await response.json();
        setItemData(data.items);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchAllItems();
  }, []);

  const TAX_RATE = 0.07;

  if (!order) {
    return <div>No order data available.</div>;
  }

  const calculateSubtotal = (items) => {
    return items.reduce((sum, item) => {
      const menuItem = itemData.find((menu) => menu._id === item.menuItemId);
      return sum + (menuItem ? menuItem.price * item.quantity : 0);
    }, 0);
  };

  const subtotal = calculateSubtotal(order.items);
  const taxes = TAX_RATE * subtotal;
  const total = subtotal + taxes;

  return (
    <div className="bg-yellow-100 h-screen">
      <div className="flex items-center justify-between ml-10">
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon fontSize="large" style={{ fontWeight: "bold" }} />
        </IconButton>
        <h1 className="text-4xl">Seat Order</h1>
        <img
          className="h-24 rounded-full border-4 border-black mt-5 mr-7"
          src={logo}
          alt=""
        />
      </div>
      <div className="flex-col text-center justify-items-center">
        <h1 className="font-semibold text-xl">Seat No.: {order.seatNumber}</h1>
        <h2>Name: Rishabh</h2>
        <h2>Phone No.: 7000332087</h2>

        <div className="w-3/6 mt-4">
          <TableContainer>
            <Table
              sx={{ minWidth: 600, backgroundColor: "rgb(254,249,195)" }}
              aria-label="spanning table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Details
                  </TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Items</TableCell>
                  <TableCell align="right">Qty.</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map((item) => {
                  const menuItem = itemData.find((menu) => menu._id === item.menuItemId);
                  const itemTotal = menuItem ? menuItem.price * item.quantity : 0;
                  return (
                    <TableRow key={item.menuItemId}>
                      <TableCell>{menuItem ? menuItem.name : "Unknown Item"}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{menuItem ? menuItem.price : 0}</TableCell>
                      <TableCell align="right">{itemTotal.toFixed(2)}</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">{subtotal.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                  <TableCell align="right">{taxes.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">{total.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="flex justify-center gap-52 mt-10">
        <Button
          onClick={() => setIsPaid(!isPaid)}
          sx={{
            backgroundColor: isPaid ? "green" : "red",
            "&:hover": {
              backgroundColor: isPaid ? "darkgreen" : "darkred",
            },
          }}
          variant="contained"
        >
          {isPaid ? "Paid" : "Unpaid"}
        </Button>
      </div>
    </div>
  );
};

export default SeatOrderPage;
