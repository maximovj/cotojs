import React, { createContext, useState, useEffect, useContext } from 'react';
import { authServiceCheckAuth } from '../services/authService.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await authServiceCheckAuth();
                setIsAuthenticated(response.data?.success || false);
            } catch (error) {
                console.error("Error al verificar autenticación:", error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
