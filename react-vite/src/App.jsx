import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import { Error404 } from "./pages/error/Error404";
import { Register } from "./pages/register/Register";
import { SignIn } from "./pages/sign_in/SignIn";
import { News } from "./pages/news/News";
import Home from "./pages/Home";


// Modulo de notificaciones 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <div className="container mx-auto my-8">
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/news" element={<News />} ></Route>
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
