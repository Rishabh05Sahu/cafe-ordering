import React from "react";
import Sidebar from "./Sidebar";
import menu from "../assets/menu.svg";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
    const location = useLocation(); 
    const navigate = useNavigate(); 
    const isSeatPage = location.pathname === "/seat-order"; 
  return (
    <div>
      <div className="flex items-center justify-between px-8  h-[15vh]">
      {isSeatPage ? (
          <IconButton
            aria-label="back"
            size="large"
            onClick={() => navigate(-1)} // Navigate to the previous page
          >
            <ArrowBackIcon fontSize="large" style={{ fontWeight: "bold" }} />
          </IconButton>
        ) : (
          <Sidebar />
        )}
        <h1 className="font-bold text-black text-5xl font-mono">{props.title}</h1>
        <img
          className="h-20 rounded-full border-2 bg-orange border-black max-sm:h-16"
          src={menu}
          alt=""
        />
      </div>
    </div>
  );
};

export default Navbar;
