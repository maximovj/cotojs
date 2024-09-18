/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { DotLoader } from 'react-spinners';
import { authServiceCheckAuth, authServiceLogOut, authServiceSignIn } from '../services/authService.js';
import { useToast } from '../hooks/useToast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const showToast = useToast();
    const [isAuthenticated, setIsAuthenticated] = useState(Cookies.get('connect.active') === 'true');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuth = () => {
            if (Cookies.get('connect.active') === 'true') {
                authServiceCheckAuth().then((response) => {
                    if (response.status === 200 && response.data.success) {
                        setUser(response.data._src);
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                        showToast('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.', 'error');
                        logout();
                    }
                })
                    .catch(() => {
                        setIsAuthenticated(false);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                setLoading(false);
                setIsAuthenticated(false);
            }
        };

        checkAuth();

        if (isAuthenticated) {
            const interval = setInterval(checkAuth, 30 * 60 * 1000); // Cada 30 minutos
            return () => clearInterval(interval);
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, showToast]);

    const logout = async () => {
        await authServiceLogOut();
        Cookies.remove('connect.sid');
        Cookies.remove('connect.active');
        setLoading(false);
        setIsAuthenticated(false);
        setUser(null);
        //window.location.href = '/sign-in';
    };

    const login = async (credentials) => {
        try {
            const response = await authServiceSignIn(credentials);
            if (response.data?.success) {
                Cookies.set('connect.active', 'true');
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

    // Renderizar un mensaje de carga mientras se verifica el estado de autenticación
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col justify-center items-center">
                    <DotLoader color="#3498db" loading={true} size={40} />
                    <p className="text-gray-500 mt-2">Cargando contenido, un momento...</p>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, logout, login, user }}>
            {children}
        </AuthContext.Provider>
    );
};
