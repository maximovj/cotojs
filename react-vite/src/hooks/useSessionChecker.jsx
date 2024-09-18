/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { authServiceCheckAuth } from '../services/authService.js';

export const useSessionChecker = () => {
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await authServiceCheckAuth();
                if (response.status === 200 && response.data.success) {
                    // La sesión es válida
                } else {
                    // La sesión ha expirado
                    window.location.href = '/sign-in';
                }
            } catch (error) {
                // Manejar el error
                window.location.href = '/sign-in';
            }
        };

        // Verificar sesión cada 5 minutos
        const interval = setInterval(checkSession, 0.01 * 60 * 1000); // 5 minutos en milisegundos

        return () => clearInterval(interval);
    }, []);
};