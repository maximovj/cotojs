import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { Error404 } from "./pages/error/Error404";
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import NavBar from './components/NavBar';
import RootRoute from './components/RootRoute';
import { Register } from "./pages/register/Register";
import { SignIn } from "./pages/sign_in/SignIn";
import { Create } from "./pages/room/Create";
import Room from "./pages/room/Room";
import Rooms from "./pages/room/Rooms";
import Home from './pages/Home';

// Modulo de notificaciones 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <div className="container mx-auto my-8">
          <Routes>
            <Route path="/" element={<RootRoute />} ></Route>
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} ></Route>
            <Route path="/sign-in" element={<PublicRoute><SignIn /></PublicRoute>} ></Route>
            <Route path="/home" element={<Home />} ></Route>
            <Route path="/rooms" element={<PrivateRoute><Rooms /></PrivateRoute>} ></Route>
            <Route path="/room/create" element={<PrivateRoute><Create /></PrivateRoute>} ></Route>
            <Route path="/room/:id" element={<PrivateRoute><Room /></PrivateRoute>} ></Route>
            <Route path="*" element={<Error404 />} ></Route>
          </Routes>
        </div>
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
