import React from "react";
import logo from "../assets/logo.png";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Navbar = (props) => {
  const { seatId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton = location.pathname !== `/seat-no/${seatId}`;
  const showLogo = location.pathname === `/seat-no/${seatId}`;
  const showSeatNo = location.pathname === `/seat-no/${seatId}`;

  return (
    <div className="flex items-center justify-between px-8 w-2/3 h-[15vh]">
      {showBackButton && (
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => navigate(`/seat-no/${seatId}`)}
        >
          <ArrowBackIcon fontSize="large" style={{ fontWeight: "bold" }} />
        </IconButton>
      )}

      {showSeatNo && (
        <div className="bg-light_grey border-2 border-solid border-light_orange text-black py-4 px-12 rounded-lg">
          <p>Seat No: {seatId}</p>
        </div>
      )}

      <h1 className="font-bold text-black text-5xl font-mono">{props.title}</h1>

      {showLogo && (
        <img
          className="h-20 rounded-full border-4 border-black"
          src={logo}
          alt=""
        />
      )}
    </div>
  );
};

export default Navbar;
