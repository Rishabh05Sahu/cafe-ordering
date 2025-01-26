import React, { useState } from 'react';
import { Box, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <Box>
      {/* Menu Icon */}
      <IconButton
        onClick={handleToggleSidebar}
        sx={{ fontSize: '32px', fontWeight: 'bold', color: 'black' }}
      >
        <MenuIcon sx={{ fontSize: '6vh', marginTop: '2vh', marginLeft: '1.5vw' }} />
      </IconButton>

      {/* Drawer (Sidebar) */}
      <Drawer anchor="left" open={open} onClose={handleToggleSidebar}>
        <List sx={{ width: '20vw', marginTop: '1vh', marginLeft: '1vw' }}>
          <ListItem  onClick={() => navigate('/')}>
            <ListItemText primary="All Orders" />
          </ListItem>
          <Divider />
          <ListItem  onClick={() => navigate('/menu')}>
            <ListItemText primary="Menu" />
          </ListItem>
          <Divider />
          <ListItem  onClick={() => navigate('/qr-generation')}>
            <ListItemText primary="QR Generation" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
