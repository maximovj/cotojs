import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white font-bold text-xl">CotoJS</Link>
                <div className="space-x-4">
                    <Link to="/news" className="text-white hover:text-gray-300">Novedades</Link>
                    <Link to="/register" className="text-white hover:text-gray-300">Registrarme</Link>
                    <Link to="/sign-in" className="text-white hover:text-gray-300">Acceder</Link>
                </div>
            </div>
        </nav>
    );
}