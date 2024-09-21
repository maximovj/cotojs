/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import routes from '../routes/routes.js';

const RootRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null;

    return isAuthenticated ? <Navigate to={routes.Rooms} /> : <Navigate to={routes.Home} />;
};

export default RootRoute;