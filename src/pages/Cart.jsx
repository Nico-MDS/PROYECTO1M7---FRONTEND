import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/checkout");
      window.location.href = res.data.url;
    } catch (error) {
      console.error("Error al iniciar el pago:", error);
      alert("No se pudo iniciar el pago.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
        Tu carrito
      </h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          Tu carrito está vacío.
        </p>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cart.map((item) => (
              <div
                key={item.product._id}
                className="bg-white shadow-sm rounded-lg p-4 flex justify-between items-center border border-gray-200"
              >
                <div>
                  <h3 className="text-lg font-semibold capitalize text-blue-700">
                    {item.product.title || item.product.programType}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Cantidad: {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-gray-800 font-medium">
                    ${item.product.price * item.quantity}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-500 hover:text-red-700 text-sm border px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right text-xl font-bold text-gray-800 mb-6">
            Total: ${total}
          </div>

          <div className="flex justify-between flex-col md:flex-row gap-4">
            <button
              onClick={clearCart}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg text-sm transition w-full md:w-auto"
            >
              Vaciar carrito
            </button>
            <button
              onClick={handleCheckout}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm transition w-full md:w-auto"
            >
              Ir a pagar
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
