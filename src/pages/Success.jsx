import { Link } from "react-router-dom";
import { useEffect } from "react";

function Success() {
  useEffect(() => {
    // Puedes agregar lógica adicional aquí si quieres limpiar el carrito o actualizar el estado global
    console.log("Pago exitoso, gracias por tu compra.");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white rounded-xl shadow-lg p-10 text-center max-w-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">¡Pago exitoso! ✅</h1>
        <p className="text-gray-700 mb-6">
          Gracias por tu compra. Hemos recibido tu pago correctamente.
        </p>
        <Link
          to="/programs"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Volver al catálogo
        </Link>
      </div>
    </div>
  );
}

export default Success;
