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
            <Route path='/' element={<RootRoute />} ></Route>
            <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} ></Route>
            <Route path='/home' element={<PublicRoute><Home /></PublicRoute>} ></Route>
            <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} ></Route>
            <Route path='/profile/activity_feed' element={<PrivateRoute><ActivityFeed /></PrivateRoute>} ></Route>
            <Route path='/profile/edit' element={<PrivateRoute><EditProfile /></PrivateRoute>} ></Route>
            <Route path='/rooms' element={<PrivateRoute><Rooms /></PrivateRoute>} ></Route>
            <Route path='/room/create' element={<PrivateRoute><CreateRoom /></PrivateRoute>} ></Route>
            <Route path='/room/:id' element={<PrivateRoute><ChatRoom /></PrivateRoute>} ></Route>
            <Route path='/room/edit/:id' element={<PrivateRoute><EditRoom /></PrivateRoute>} ></Route>
            <Route path='*' element={<Error404 />} ></Route>
          </Routes>
        </div>
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
