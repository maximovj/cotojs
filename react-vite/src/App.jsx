import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Error404 } from "./pages/error/Error404";
import { Register } from "./pages/register/Register";
import { SignIn } from "./pages/sign_in/SignIn";

// Modulo de notificaciones 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {

  return (
    <BrowserRouter>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-white font-bold text-xl">CotoJS</a>
          <div className="space-x-4">
            <a href="/news" className="text-white hover:text-gray-300">Novedades</a>
            <a href="/register" className="text-white hover:text-gray-300">Registrarme</a>
            <a href="/sign-in" className="text-white hover:text-gray-300">Acceder</a>
          </div>
        </div>
      </nav>
      <div className="container mx-auto my-8">
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/register" element={<Register />} ></Route>
          <Route path="/sign-in" element={<SignIn />} ></Route>
          <Route path="*" element={<Error404 />} ></Route>
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App;
