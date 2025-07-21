import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Programs from "./pages/Programs";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <div className="bg-gray-50 min-h-screen flex items-center justify-center px-6 py-16">
                <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
                  {/* Imagen lateral */}
                  <div className="md:w-1/2 w-full">
                    <img
                      src="/src/assets/Estudiar.jpg"
                      alt="Personas estudiando"
                      className="w-full h-auto max-h-[400px] object-cover rounded-xl shadow-lg"
                    />
                  </div>

                  {/* Texto principal */}
                  <div className="md:w-1/2 w-full text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#5A6ACF] mb-6 leading-tight">
                      Inicio
                    </h1>
                    <p className="text-gray-700 text-lg mb-6">
                      Entrena tu mente, mejora tu atención y potencia tu
                      aprendizaje con programas cognitivos personalizados.
                    </p>
                    <a
                      href="/programs"
                      className="inline-block bg-[#5DCDA4] hover:bg-[#4ac39a] text-white text-lg px-6 py-3 rounded-full shadow transition duration-300"
                    >
                      Ver programas →
                    </a>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
