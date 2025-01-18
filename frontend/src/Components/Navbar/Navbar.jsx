import React from "react";
import logo from "../../assets/logo.png";
import { useParams, useLocation, useNavigate } from "react-router-dom"; 
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Navbar = (props) => {
  const { seatId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();  

  
  const showBackButton = location.pathname !== `/seat-no/${seatId}`;

  return (
    <div className="flex items-center justify-around gap-96 pt-5 bg-yellow-100">
      {showBackButton && (
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => navigate(`/seat-no/${seatId}`)}  // Use navigate to go to MenuPage
        >
          <ArrowBackIcon fontSize="large" style={{ fontWeight: "bold" }} />
        </IconButton>
      )}
      {/* <p>seat no: {seatId}</p> */}
      <h1 className="font-bold font-sans text-4xl">{props.title}</h1>

      <img
        className="h-24 rounded-full border-4 border-black"
        src={logo}
        alt=""
      />
    </div>
  );
};

export default Navbar;
