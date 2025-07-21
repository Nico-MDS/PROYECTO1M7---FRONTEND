import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cancel() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/cart");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded shadow text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          ¡Pago cancelado!
        </h2>
        <p className="text-gray-700">
          Parece que cancelaste el pago. Serás redirigido al carrito en unos segundos.
        </p>
      </div>
    </div>
  );
}

export default Cancel;
