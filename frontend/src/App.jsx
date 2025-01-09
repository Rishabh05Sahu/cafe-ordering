import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import MenuPage from "./Pages/MenuPage";
import ItemPage from "./Pages/ItemPage";
import PlaceOrderPage from "./Pages/PlaceOrderPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/item" element={<ItemPage />} />
          <Route path="/place-order" element={<PlaceOrderPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
