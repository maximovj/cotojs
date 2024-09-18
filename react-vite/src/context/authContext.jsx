
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import { authServiceCheckAuth, authServiceLogOut, authServiceSignIn } from '../services/authService.js';
import { useToast } from '../hooks/useToast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const showToast = useToast();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await authServiceCheckAuth();
                if (response.status === 200 && response.data.success) {
                    setUser(response.data._src);
                    setIsAuthenticated(true);
                } else {
                    showToast('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.', 'error');
                    setIsAuthenticated(false);
                    logout();
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const logout = async () => {
        await authServiceLogOut();
        setIsAuthenticated(false);
    };

    const login = async (credentials) => {
        try {
            const response = await authServiceSignIn(credentials);
            if (response.data?.success) {
                setUser(response.data._src);
                setIsAuthenticated(true);
                showToast(response.data.ctx_content, 'success');
                return true;
            }
        } catch (error) {
            if (error.response?.data.ctx_content) {
                showToast(error.response.data.ctx_content, 'error');
            }
        }
        return false;
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, logout, login, user }}>
            {children}
        </AuthContext.Provider>
    );
};
