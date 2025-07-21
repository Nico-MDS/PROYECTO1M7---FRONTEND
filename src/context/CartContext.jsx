import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useContext(UserContext);
  const [cart, setCart] = useState([]);

  // Cargar carrito al iniciar sesión
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setCart(res.data.items || []))
        .catch((err) => console.error("Error al cargar el carrito:", err));
    } else {
      setCart([]);
    }
  }, [token]);

  // Agregar producto al carrito
  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.items);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  // Eliminar un producto del carrito
  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/cart/remove/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(res.data.items || []);
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
    }
  };

  // Vaciar todo el carrito
  const clearCart = async () => {
    try {
      await axios.delete("http://localhost:5000/api/cart/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart([]);
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
