import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import  MenuCategory from "../../Data/MenuCategory.js"

const MenuPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Handle opening the menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleMenuOpen}
      >
        Show Categories
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
      >
        {MenuCategory.map((category) => (
          <MenuItem key={category.id} onClick={handleMenuClose}>
            <img src={category.imageUrl} alt={category.name} style={{ width: 30, height: 30, marginRight: 10 }} />
            {category.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default MenuPage;
