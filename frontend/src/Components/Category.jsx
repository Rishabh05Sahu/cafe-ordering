import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

const Category = ({ category }) => {
  const navigate = useNavigate();
  const { seatId } = useParams();

  return (
    <ImageListItem
      key={category._id}
      onClick={() =>
        navigate(`/seat-no/${seatId}/item`, {
          state: { categoryId: category._id, categoryName: category.name },
        })
      }
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        border: ".5px solid grey",
        borderRadius: "15%",
        height: "fit-content",
        width: "200px",
      }}
    >
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
    </ImageListItem>
  );
};

export default Category;
