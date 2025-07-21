import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Crear el contexto
export const UserContext = createContext();

// Componente proveedor
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // datos del usuario
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Configurar token en headers de Axios
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Recuperar usuario si hay token pero no usuario
  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user) {
        try {
          const res = await axios.get("http://localhost:5000/api/user/profile");
          setUser(res.data);
        } catch (err) {
          console.error("Error al recuperar usuario:", err);
          logout();
        }
      }
    };

    fetchUser();
  }, [token]);

  // Login
  const login = async (email, password) => {
    const res = await axios.post("http://localhost:5000/api/user/login", {
      email,
      password,
    });
    const { token, user } = res.data;
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
  };

  // Registro
  const signup = async (name, email, password) => {
    const res = await axios.post("http://localhost:5000/api/user/register", {
      name,
      email,
      password,
    });
    const { token, user } = res.data;
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
  };

  // Logout
  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
};
