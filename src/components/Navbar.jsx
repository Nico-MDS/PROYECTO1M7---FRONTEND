import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { user, logout } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalItems = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Inicio
        </Link>

        <div className="flex gap-6 items-center text-sm">
          <Link to="/programs" className="text-gray-700 hover:text-blue-600">
            Programas
          </Link>

          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-blue-600"
          >
            Carrito
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {!user ? (
            <>
              <Link to="/login" className="text-blue-600 hover:underline">
                Iniciar sesión
              </Link>
              <Link to="/signup" className="text-blue-600 hover:underline">
                Registrar
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-600 hidden md:inline">
                Hola, {user.name || "Usuario"}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
