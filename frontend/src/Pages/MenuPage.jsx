import React from "react";
import logo from "../assets/logo.png";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useNavigate } from "react-router-dom";

const MenuPage = () => {
  const navigate = useNavigate();

  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
      author: "@bkristastucchio",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
      author: "@rollelflex_graphy726",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
      author: "@helloimnik",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
      author: "@nolanissac",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
      author: "@hjrc33",
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
      author: "@arwinneil",
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
      author: "@tjdragotta",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
      author: "@katie_wasserman",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
      author: "@silverdalex",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
      author: "@shelleypauls",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
      author: "@peterlaster",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
      author: "@southside_customs",
    },
  ];
  return (
    <div className="bg-yellow-100 h-screen">
      <div className="flex items-center justify-end gap-96 pt-5 mr-20">
        <h1 className="font-bold font-sans text-4xl">YOUR CAFE NAME</h1>
        <img
          className="h-24 rounded-full border-4 border-black"
          src={logo}
          alt=""
        />
      </div>
      <div>
        <ImageList
          className="ml-52 mt-8"
          sx={{ width: "70%", height: 510 }}
          cols={3}
          gap={16}
          rowHeight={260}
        >
          {itemData.map((item) => (
            <ImageListItem
              key={item.img}
              onClick={() => navigate("/item")}
              style={{ cursor: "pointer" }}
            >
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                position="below"
                sx={{
                  textAlign: "center",
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      <div
        onClick={() => navigate("/place-order")}
        style={{ cursor: "pointer" }}
        className="flex-col place-items-center bg-red-300 rounded-lg w-1/3 m-auto mt-6 p-3"
      >
        <p className="text-xl"> 1 item added </p>
        <p>total order 500</p>
      </div>
    </div>
  );
};

export default MenuPage;
