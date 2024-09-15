import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState, useRef, useEffect } from 'react';
import profilePicture from '../assets/150.png';

export default function NavBar() {
    const { isAuthenticated, logout, user } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white font-bold text-xl">CotoJS</Link>
                <div className="space-x-4 flex items-center">
                    {isAuthenticated && <Link to="/room/create" className="text-white hover:text-gray-300">Crear sala</Link>}

                    {isAuthenticated && (
                        <div className="relative" ref={dropdownRef}>
                            <button onClick={toggleDropdown} className="focus:outline-none">
                                <img
                                    src={user?.profilePicture || profilePicture || 'https://via.placeholder.com/150'}
                                    alt="Foto de perfil"
                                    className="w-10 h-10 rounded-full border-2 border-white"
                                />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-300">
                                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg">Perfil</Link>
                                    <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Configuración</Link>
                                    <button
                                        onClick={logout}
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
                                    >
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {!isAuthenticated && <Link to="/register" className="text-white hover:text-gray-300">Registrarme</Link>}
                    {!isAuthenticated && <Link to="/sign-in" className="text-white hover:text-gray-300">Acceder</Link>}
                </div>
            </div>
        </nav>
    );
}
