/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { authServiceCheckAuth } from '../services/authService.js';
import routes from '../routes/routes.js';

export const useSessionChecker = () => {
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await authServiceCheckAuth();
                if (response.status === 200 && response.data.success) {
                    // La sesión es válida
                } else {
                    // La sesión ha expirado
                    window.location.href = routes.Login;
                }
            } catch (error) {
                // Manejar el error
                window.location.href = routes.Login;
            }
        };

        // Verificar sesión cada 5 minutos
        const interval = setInterval(checkSession, 15 * 60 * 1000); // 15 minutos en milisegundos

        return () => clearInterval(interval);
    }, []);
};