import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        // Muestra un loader o simplemente no renderiza nada hasta que se complete la carga
        return;
    }

    if (!isAuthenticated) {
        return <Navigate to="/sign-in" />;
    }

    return <Outlet />;
}
