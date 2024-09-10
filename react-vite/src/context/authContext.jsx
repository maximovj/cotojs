
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import { authServiceCheckAuth, authServiceLogOut, authServiceSignIn } from '../services/authService.js';
import { useToast } from '../hooks/useToast';

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
                    //showToast(response.data.ctx_content, 'success');
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    const logout = async () => {
        await authServiceLogOut();
        setIsAuthenticated(false);
        window.location.href = '/sign-in';
    };

    const login = async (credentials) => {
        try {
            const response = await authServiceSignIn(credentials);
            if (response.data?.success) {
                setIsAuthenticated(true);
                showToast(response.data.ctx_content, 'success');
                window.location.href = '/news';
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
        <AuthContext.Provider value={{ isAuthenticated, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};
