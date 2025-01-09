import React, { useState } from "react";
import logo from "../assets/logo.png";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

const SeatOrderPage = () => {
  const [isServed, setIsServed] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const navigate = useNavigate();

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
      <div className="flex items-center justify-between ml-10">
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon fontSize="large" style={{ fontWeight: "bold" }} />
        </IconButton>
        <h1 className="text-4xl">All Orders</h1>
        <img
          className="h-24 rounded-full border-4 border-black mt-5 mr-7"
          src={logo}
          alt=""
        />
      </div>
      <div className="flex-col text-center  justify-items-center">
        <h1 className="font-semibold text-xl">Seat No. : 5</h1>
        <h2>Name : Rishabh</h2>
        <h2>Phone No. : 7000332087 </h2>

        <div className="w-3/6 mt-4 ">
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
                  <TableCell align="right">price</TableCell>
                  <TableCell align="right">Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.desc}>
                    <TableCell>{row.desc}</TableCell>
                    <TableCell align="right">{row.qty}</TableCell>
                    <TableCell align="right">{row.unit}</TableCell>
                    <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">
                    {ccyFormat(invoiceSubtotal)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                    0
                  )} %`}</TableCell>
                  <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="flex justify-center gap-52 mt-10">
        <Button
          onClick={() => setIsServed(!isServed)}
          sx={{
            backgroundColor: isServed ? "green" : "red",
            "&:hover": {
              backgroundColor: isServed ? "darkgreen" : "darkred",
            },
          }}
          variant="contained"
        >
          {isServed ? "Served" : "Unserved"}
        </Button>
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
