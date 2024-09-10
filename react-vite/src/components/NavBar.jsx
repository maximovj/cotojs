import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function NavBar() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        // Opcional: Puedes mostrar un loader o algo mientras verificas la autenticación
        return <div className="bg-blue-500 p-4">Loading...</div>;
    }

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white font-bold text-xl">CotoJS</Link>
                <div className="space-x-4">
                    {isAuthenticated ? (
                        <Link to="/news" className="text-white hover:text-gray-300">Novedades</Link>
                    ) : (
                        <>
                            <Link to="/register" className="text-white hover:text-gray-300">Registrarme</Link>
                            <Link to="/sign-in" className="text-white hover:text-gray-300">Acceder</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}