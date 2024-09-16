/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const Forbidden = ({ children, checkId }) => {
    const { user, loading } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!loading) {
            setIsLoading(false);
        }
    }, [loading]);

    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
                <div className="bg-white p-4 rounded-lg shadow-md mb-4 mt-4 text-center text-gray-600">
                    <p>Cargando...</p>
                </div>
            </div>
        );
    }

    // Si `user` no está definido, podrías considerar agregar un mensaje de error aquí
    if (!user) {
        return (
            <div className="max-w-3xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
                <div className="bg-white p-4 rounded-lg shadow-md mb-4 mt-4 text-center text-gray-600">
                    <p>Error al cargar la información del usuario.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {user.id === checkId && (
                children
            )}

            {user.id !== checkId && (
                <div className="max-w-3xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4 mt-4">
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 overflow-auto">
                            <p className="text-center text-gray-600 col-span-full">Acción prohibida.</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Forbidden;
