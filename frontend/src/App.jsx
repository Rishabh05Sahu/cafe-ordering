import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MenuPage from "./Pages/MenuPage";
import ItemPage from "./Pages/ItemPage";
import PlaceOrderPage from "./Pages/PlaceOrderPage";
import Navbar from "./Components/Navbar/Navbar"; // Import your Navbar component

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/seat-no/:seatId"
          element={
            <>
              <Navbar title="Menu" />
              <MenuPage />
            </>
          }
        />
        <Route
          path="/seat-no/:seatId/item"
          element={
            <>
              <Navbar title="Item" />
              <ItemPage />
            </>
          }
        />
        <Route
          path="/seat-no/:seatId/place-order"
          element={
            <>
              <Navbar title="Place Order" />
              <PlaceOrderPage />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
