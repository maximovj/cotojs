/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null;

    return isAuthenticated ? children : <Navigate to='/login' />;
};

export default PrivateRoute;