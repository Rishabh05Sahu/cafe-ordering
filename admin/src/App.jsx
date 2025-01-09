import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import AllOrdersPage from './Pages/AllOrderPage';
import MenuPage from './Pages/MenuPage';
import QrGenerationPage from './Pages/QrPage';
import SeatOrderPage from './Pages/SeatOrderPage';

function App() {
  return (
    <Router>
     
      
      <Routes>
        <Route path="/" element={<AllOrdersPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/qr-generation" element={<QrGenerationPage />} />
        <Route path="/seat-order" element={<SeatOrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
