/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import { authServiceCheckAuth } from '../services/authService.js';
import { useToast } from '../hooks/useToast.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const showToast = useToast();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await authServiceCheckAuth();
                if (response.status === 200 && response.data.success) {
                    setIsAuthenticated(true);
                    showToast(response.data.ctx_content, 'success');
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
