import { useContext, useState, useEffect } from "react";
import { CartContext } from "../CartContext.jsx";
import Cart from "../Components/Cart.jsx";
import Category from "../Components/Category.jsx";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const MenuPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(true);
  const { cart } = useContext(CartContext);
  const [menuCategories, setMenuCategories] = useState([]);

  useEffect(() => {
    const fetchMenuCategories = async () => {
      try {
        const url = `${backendUrl}/menu/categories`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setMenuCategories(data.categories);
      } catch (error) {
        console.error("Error fetching menu categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuCategories();
  }, [backendUrl]);

  return (
    <div className="bg-white w-full max-w-screen-lg mx-auto px-4">
      {loading ? (
        <div className="flex justify-center items-center h-80">
          <DotLottieReact
            src="https://lottie.host/3471aa0d-da23-4dba-82a8-613adbf4820f/hIcgGOPeAu.lottie"
            loop
            autoplay
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto max-h-[80vh] max-sm:h-[70vh] pb-4">
          {menuCategories.map((category) => (
            <Category category={category} key={category._id} />
          ))}
        </div>
      )}

      {cart.length > 0 && <Cart />}
    </div>
  );
};

export default MenuPage;
