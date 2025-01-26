import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./Pages/MenuPage";
import ItemPage from "./Pages/ItemPage";
import PlaceOrderPage from "./Pages/PlaceOrderPage";
import Navbar from "./Components/Navbar.jsx"; // Import your Navbar component


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/seat-no/:seatId"
          element={
            <div className="bg-white flex flex-col items-center">
              <Navbar title="Menu" />
              <MenuPage />
            </div>
          }
        />
        <Route path="/seat-no/:seatId/item" element={<ItemPage />} />
        <Route
          path="/seat-no/:seatId/place-order"
          element={
            <div className="bg-white w-3/4  mx-auto">
              <Navbar title="Place Order" />
              <PlaceOrderPage />
            </div>
          }
        />
      </Routes>
    </Router>

   
  );
}

export default App;
