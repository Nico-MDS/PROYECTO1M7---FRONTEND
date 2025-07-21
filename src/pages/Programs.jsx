import { useEffect, useState, useContext } from "react";
import axiosClient from "../config/axios";
import { CartContext } from "../context/CartContext";

// Imágenes locales como respaldo visual si no hay una desde backend
import basicImg from "../assets/programs/basic.jpg";
import standardImg from "../assets/programs/standard.jpg";
import premiumImg from "../assets/programs/premium.jpg";

const defaultImages = {
  Basic: basicImg,
  Standard: standardImg,
  Premium: premiumImg,
};

function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data } = await axiosClient.get("/products");
        setPrograms(data);
      } catch (error) {
        console.error("Error al cargar programas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const handleAdd = async (id) => {
    await addToCart(id);
    alert("Producto agregado al carrito 🛒");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-[#5A6ACF] mb-10">
        Catálogo de Programas
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Cargando programas...</p>
      ) : programs.length === 0 ? (
        <p className="text-center text-gray-600">No hay programas disponibles.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={p.image || defaultImages[p.programType] || basicImg}
                alt={p.title || p.programType}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-700 capitalize mb-2">
                  {p.title || p.programType}
                </h3>
                <p className="text-gray-700 mb-2">
                  {p.description ||
                    "Este programa ofrece herramientas cognitivas personalizadas."}
                </p>
                <p className="text-gray-700 mb-4">
                  Precio:{" "}
                  <span className="text-green-600 font-semibold">
                    ${p.price}
                  </span>
                </p>
                <button
                  onClick={() => handleAdd(p._id)}
                  className="w-full bg-[#5A6ACF] text-white py-2 rounded hover:bg-[#4a59b0] transition"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Programs;
