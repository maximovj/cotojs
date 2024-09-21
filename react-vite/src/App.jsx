import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Error404 from './pages/error/Error404';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import NavBar from './components/NavBar';
import RootRoute from './components/RootRoute';
import Login from './pages/login/Login';
import CreateRoom from './pages/room/CreateRoom';
import ChatRoom from './pages/room/ChatRoom';
import Rooms from './pages/room/Rooms';
import Home from './pages/Home';
import Profile from './pages/profile/Profile';
import EditRoom from './pages/room/EditRoom';
import EditProfile from './pages/profile/EditProfile';
import ActivityFeed from './pages/activity_feed/ActivityFeed';
import InactivityHandler from './components/InactivityHandler';
import routes from './routes/routes.js';

// Modulo de notificaciones 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <InactivityHandler />
        <NavBar />
        <div className='container mx-auto my-8'>
          <Routes>
            <Route path={routes.Root} element={<RootRoute />} ></Route>
            <Route path={routes.Login} element={<PublicRoute><Login /></PublicRoute>} ></Route>
            <Route path={routes.Home} element={<PublicRoute><Home /></PublicRoute>} ></Route>
            <Route path={routes.Profile} element={<PrivateRoute><Profile /></PrivateRoute>} ></Route>
            <Route path={routes.ActivityFeed} element={<PrivateRoute><ActivityFeed /></PrivateRoute>} ></Route>
            <Route path={routes.EditProfile} element={<PrivateRoute><EditProfile /></PrivateRoute>} ></Route>
            <Route path={routes.Rooms} element={<PrivateRoute><Rooms /></PrivateRoute>} ></Route>
            <Route path={routes.CreateRoom} element={<PrivateRoute><CreateRoom /></PrivateRoute>} ></Route>
            <Route path={routes.ChatRoom + '/:id'} element={<PrivateRoute><ChatRoom /></PrivateRoute>} ></Route>
            <Route path={routes.EditRoom + '/:id'} element={<PrivateRoute><EditRoom /></PrivateRoute>} ></Route>
            <Route path={routes.Error404} element={<Error404 />} ></Route>
          </Routes>
        </div>
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
