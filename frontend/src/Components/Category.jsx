import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { motion } from "motion/react"

const Category = ({ category }) => {
  const navigate = useNavigate();
  const { seatId } = useParams();

  return (
    <motion.ImageListItem
    whileHover={{scale:1.01}}
   
      key={category._id}
      onClick={() =>
        navigate(`/seat-no/${seatId}/item`, {
          state: { categoryId: category._id, categoryName: category.name },
        })
      }
       className="flex flex-col items-center justify-center  p-4 border border-gray-300 rounded-lg cursor-pointer hover:shadow-md">
      <img
        className="rounded-md"
        srcSet={`${category.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
        src={`${category.imageUrl}?w=248&fit=crop&auto=format`}
        alt={category.name}
        loading="lazy"
        style={{
          width: "60%",
          objectFit: "contain",
        }}
      />
      <ImageListItemBar
        title={category.name}
        position="below"
        sx={{
          textAlign: "center",
        }}
      />
    </motion.ImageListItem>
  );
};

export default Category;
