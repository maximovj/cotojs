import { useAuth } from '../../hooks/useAuth';

export function News() {
    const { logout } = useAuth();

    const handleOnClick = () => {
        logout();
    }

    return (<div>
        <button onClick={handleOnClick} className='bg-red-600 p-2 rounded-lg text-white'>
            Cerrar sesión
        </button>
    </div>);
}