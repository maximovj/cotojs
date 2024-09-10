import { useState, useEffect } from 'react';
import { authServiceCheckAuth } from '../services/authService.js';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await authServiceCheckAuth();
                // Verifica si la respuesta indica que el usuario está autenticado
                if (response.data?.success) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Error al verificar autenticación:", error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false); // La verificación ha terminado
            }
        }

        checkAuth();
    }, []);

    return { isAuthenticated, loading };
}
