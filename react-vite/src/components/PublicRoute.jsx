/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import routes from '../routes/routes.js';

const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null;

    return !isAuthenticated ? children : <Navigate to={routes.Root} />;
};

export default PublicRoute;
