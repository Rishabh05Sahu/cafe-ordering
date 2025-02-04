import React from "react";
import menu from "../assets/menu.svg";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "motion/react"

const Navbar = (props) => {
  const { seatId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton = location.pathname !== `/seat-no/${seatId}`;
  const showLogo = location.pathname === `/seat-no/${seatId}`;
  const showSeatNo = location.pathname === `/seat-no/${seatId}`;

  return (
    <div className="flex items-center justify-between px-8  w-2/3 max-sm:w-full max-sm:px-1 max-sm:justify-evenly h-[15vh] ">
      {showBackButton && (
        <motion.IconButton
         whileHover={{scale:1.01}}
         whileTap={{scale:0.99}}
          aria-label="delete"
          size="large"
          onClick={() => navigate(`/seat-no/${seatId}`)}
        >
          <ArrowBackIcon fontSize="large" style={{ fontWeight: "bold",cursor:"pointer" }} />
        </motion.IconButton>
      )}

      {showSeatNo && (
        <div className="bg-light_grey hover:scale-105 cursor-pointer border-2 border-solid  border-light_orange text-black py-4 px-12 rounded-lg max-sm:py-2 max-sm:px-4">
          <p>Seat No: {seatId}</p>
        </div>
      )}

      <h1 className="font-bold text-black text-5xl font-mono max-sm:text-3xl ">
        {props.title}
      </h1>

      {showLogo && (
        <img
          className="h-20 rounded-full border-2 bg-orange border-black max-sm:h-16"
          src={menu}
          alt=""
        />
      )}
    </div>
  );
};

export default Navbar;
