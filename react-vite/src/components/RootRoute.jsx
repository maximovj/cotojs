/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RootRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null;

    return isAuthenticated ? <Navigate to='/rooms' /> : <Navigate to='/home' />;
};

export default RootRoute;