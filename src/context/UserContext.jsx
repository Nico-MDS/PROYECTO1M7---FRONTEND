import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user) {
        try {
          const res = await axios.get("http://localhost:5000/api/user/profile");
          setUser(res.data);
        } catch (err) {
          console.error("❌ Error al recuperar usuario:", err);
          logout();
        }
      }
    };

    fetchUser();
  }, [token]);

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

  const signup = async (name, email, password) => {
    console.log("📦 Enviando registro con:", { name, email, password });
    const res = await axios.post("http://localhost:5000/api/user/register", {
      name,
      email,
      password,
    });
    console.log("✅ Usuario creado:", res.data);
    const { token, user } = res.data;
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
  };

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
