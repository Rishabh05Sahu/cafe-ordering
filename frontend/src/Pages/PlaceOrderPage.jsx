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
import Item from "../Components/Item";

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
        const url = `${backendUrl}/order/verify-otp`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: formData.phone, otp }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setIsOtpVerified(true);
          toast.success(data.message || "OTP verified successfully!");
        } else {
          toast.error(data.message || "Invalid OTP. Please try again.");
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
      // localStorage.removeItem("cart");
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
    <div className="flex flex-col items-center">
      <div className="w-4/5 mx-auto overflow-y-auto max-h-[72vh] max-sm:w-full">
        <div className="flex flex-col gap-y-6 max-sm:gap-y-3">
          {cart.map((item) => (
            <Item item={item} key={item._id} />
          ))}
        </div>
        <TableContainer className="mt-8">
          <Table aria-label="spanning table">
            <TableBody>
              <TableRow>
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
        className="bg-orange py-4 rounded-2xl w-3/4 mt-8"
        variant="contained"
        onClick={handleClickOpen}
      >
        Place Order
      </Button>

      <Dialog open={open} onClose={handleClose} >
        {!isOtpSent && <DialogTitle>Enter Your Details</DialogTitle>}
        <DialogContent>
          {!isOtpSent && (
            <div>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                sx={{ marginBottom: "8px" }}
              />
              <TextField
                margin="dense"
                label="Phone Number"
                type="tel"
                fullWidth
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                sx={{ marginBottom: "20px" }}
              />
              <Button
                // onClick={handleSendOtp}
                onClick={handleOrder}
                variant="contained"
                fullWidth
              
                sx={{
                  background: "var(--dark-green)",
                  borderRadius: "8px",
                 
                }}
              >
                {/* Send OTP */}
                place order
              </Button>
            </div>
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
                sx={{ marginBottom: "20px" }}
              />
              <Button
                onClick={handleResendOtp}
                variant="outlined"
                disabled={resendTimer > 0}
                style={{ flex: 1, marginBottom: '20px ', color: 'var(--orange)', borderColor: 'var(--orange' }}
              >
                Resend OTP {resendTimer > 0 ? `(${resendTimer}s)` : ""}
              </Button>
              <Button
                onClick={handleVerifyOtp}
                variant="contained"
                fullWidth
                sx={{background: 'var(--dark-green)'}}
              >
                Verify OTP
              </Button>
            </>
          )}
        </DialogContent>

        {isOtpSent && isOtpVerified && <DialogTitle>Confirm Order</DialogTitle>}

        <DialogActions sx={{paddingBottom: '40px', marginTop: '20px'}}>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          {isOtpVerified && (
            <Button onClick={handleConfirm} variant="contained" sx={{background: 'var(--dark-green)'}}>
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
