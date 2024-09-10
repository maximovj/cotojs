import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Ajusta la ruta según corresponda

export default function NavBar() {
    const { isAuthenticated } = useAuth();

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white font-bold text-xl">CotoJS</Link>
                <div className="space-x-4">
                    {/* Mostrar "Novedades" solo si el usuario está autenticado */}
                    {isAuthenticated && <Link to="/news" className="text-white hover:text-gray-300">Novedades</Link>}

                    {/* Mostrar "Registrarme" y "Acceder" solo si el usuario no está autenticado */}
                    {!isAuthenticated && <Link to="/register" className="text-white hover:text-gray-300">Registrarme</Link>}
                    {!isAuthenticated && <Link to="/sign-in" className="text-white hover:text-gray-300">Acceder</Link>}
                </div>
            </div>
        </nav>
    );
}