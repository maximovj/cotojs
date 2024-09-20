import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSweetAlert } from '../hooks/useSweetAlert';

const InactivityHandler = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const { showSweetAlert } = useSweetAlert();

    useEffect(() => {
        if (!isAuthenticated) return;

        let timer;
        const resetTimer = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                logout();
                showSweetAlert({
                    icon: 'info',
                    title: 'Inicio de sesión',
                    html: 'Sesión expirada por inactividad',
                    showConfirmButton: true,
                });
                navigate('/login');
            }, 15 * 60 * 1000); // 15 minutos en milisegundos
        };

        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keypress', resetTimer);
        resetTimer();

        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keypress', resetTimer);
        };
    }, [isAuthenticated, logout, navigate, showSweetAlert]);

    return null;
};

export default InactivityHandler;
