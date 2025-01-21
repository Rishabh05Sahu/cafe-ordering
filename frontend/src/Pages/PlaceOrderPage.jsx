import React, { useContext, useState, useEffect } from "react";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlaceOrderPage = () => {
  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}`;
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false); 
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0); 
  const { cart, addToCart, calculateTotal } = useContext(CartContext);
  const { seatId } = useParams();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleSendOtp = async () => {
    if (formData.phone) {
      try {
        // Call your backend API to send OTP
        const url = `${backendUrl}/order/send-otp`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: formData.phone }),
        });
  
        if (response.ok) {
          setIsOtpSent(true);
          toast.success("OTP sent to your phone!");
        } else {
          toast.error("Failed to send OTP. Try again.");
        }
      } catch (error) {
        toast.error("Error sending OTP. Please try later.");
      }
    } else {
      toast.error("Enter a valid phone number.");
    }
  };

  const handleVerifyOtp = async () => {
    if (otp) {
      try {
        // Call your backend API to verify OTP
        const url = `${backendUrl}/order/verify-otp`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: formData.phone, otp }),
        });
  
        if (response.ok) {
          setIsOtpVerified(true);
          toast.success("OTP verified successfully!");
        } else {
          toast.error("Invalid OTP. Please try again.");
        }
      } catch (error) {
        toast.error("Error verifying OTP. Please try later.");
      }
    } else {
      toast.error("Enter the OTP.");
    }
  };


  const handleResendOtp = async () => {
    if (resendTimer > 0) {
      toast.error(`Please wait ${resendTimer} seconds before resending OTP.`);
      return;
    }
  
    try {
      const url = `${backendUrl}/order/send-otp`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone }),
      });
  
      if (response.ok) {
        setIsOtpSent(true);
        setResendTimer(30); // Cooldown for 30 seconds
        toast.success("OTP resent successfully!");
      } else {
        toast.error("Failed to resend OTP. Try again.");
      }
    } catch (error) {
      toast.error("Error resending OTP. Please try later.");
    }
  };
  

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer); // Cleanup on unmount
  }, [resendTimer]);

  
  
  const handleQuantityChange = (item, action) => {
    addToCart(item, action);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    if (formData.name.trim().length < 3) {
      toast.error("Name must be at least 3 characters long.");
    } else if (formData.phone.length !== 10 || isNaN(formData.phone)) {
      toast.error("Phone number must be exactly 10 digits.");
    } else {
      toast.success("Order placed successfully!");
      console.log("Name:", formData.name);
      console.log("Phone:", formData.phone);
      handleOrder();
      setOpen(false);
    }
  };

  const handleOrder = async () => {
    const url = `${backendUrl}/order/place`;
    const seatNumber = { seatId };
    const customerName = formData.name;
    const customerNo = formData.phone;

    const items = JSON.parse(localStorage.getItem("cart"));
    console.log("Cart Data:", items);

    if (!items || items.length === 0) {
      toast.error("No items in the cart to place an order.");
      return;
    }

    const validItems = items.filter((item) => item._id && item.quantity > 0);
    if (validItems.length === 0) {
      toast.error("Cart contains invalid items.");
      return;
    }

    const payload = {
      customerName,
      customerNo,
      seatNumber,
      items: validItems.map(({ _id, quantity }) => ({
        menuItemId: _id,
        quantity,
      })),
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Order placed successfully:", data);
      toast.success("Order placed successfully!");
      localStorage.removeItem("cart");
    } else {
      console.error("Error placing order:", data.message);
      toast.error(`Error: ${data.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const TAX_RATE = 0.07;

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function priceRow(qty, unit) {
    return qty * unit;
  }

  function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
  }

  function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const rows = [
    createRow("Paperclips (Box)", 100, 1.15),
    createRow("Paper (Case)", 10, 45.99),
    createRow("Waste Basket", 2, 17.99),
  ];

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <div className="bg-yellow-100 h-screen">
      <div className="w-3/4 ml-36  ">
        <div className="flex-col overflow-y-auto max-h-[400px] ">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-yellow-100 w-3/4 h-30 border-2 border-solid border-black p-4 rounded-lg  flex items-center justify-between mt-4 ml-32"
            >
              <img
                className="h-28 w-1/6 rounded-xl"
                src={item.imageUrl}
                alt={item.name}
              />
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
        <TableContainer>
          <Table
            sx={{
              width: "10%",
              marginLeft: "14vw",
              minWidth: 600,
              backgroundColor: "rgb(254,249,195)",
            }}
            aria-label="spanning table"
          >
            <TableBody>
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">
                  {ccyFormat(calculateTotal())}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                  0
                )} %`}</TableCell>
                <TableCell align="right">
                  {ccyFormat(calculateTotal() * TAX_RATE)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">
                  {ccyFormat(calculateTotal() + calculateTotal() * TAX_RATE)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Button
        sx={{ bgcolor: "red", marginTop: 5, marginLeft: "43%" }}
        variant="contained"
        onClick={handleClickOpen}
      >
        Place Order
      </Button>

      <Dialog open={open} onClose={handleClose}>
  
  {!isOtpSent && (<DialogTitle>Enter Your Details</DialogTitle>)}
  <DialogContent>
    {!isOtpSent && (
      <>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          type="tel"
          fullWidth
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <Button
          onClick={handleSendOtp}
          color="primary"
          variant="contained"
          fullWidth
        >
          Send OTP
        </Button>
      </>
    )}

    {isOtpSent && !isOtpVerified && (
      <>
        <TextField
          autoFocus
          margin="dense"
          label="Enter OTP"
          type="text"
          fullWidth
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
          <Button
        onClick={handleResendOtp}
        color="secondary"
        variant="outlined"
        disabled={resendTimer > 0}
        style={{ flex: 1 }}
      >
        Resend OTP {resendTimer > 0 ? `(${resendTimer}s)` : ""}
      </Button>
        <Button
          onClick={handleVerifyOtp}
          color="primary"
          variant="contained"
          fullWidth
        >
          Verify OTP
        </Button>
      </>
    )}
  </DialogContent>
  {isOtpSent && isOtpVerified && (<DialogTitle>Confirm Order</DialogTitle>)}
  <DialogActions>
  
    <Button onClick={handleClose} color="error">
      Cancel
    </Button>
    {isOtpVerified  && (
      <Button onClick={handleConfirm} color="primary" variant="contained">
        Confirm
      </Button>
    )}
  </DialogActions>
</Dialog>


      <ToastContainer />
    </div>
  );
};

export default PlaceOrderPage;
