import { useToast } from '../../hooks/useToast.js';
import { authServiceLogOut } from '../../services/authService.js';

export function News() {
    const showToast = useToast();

    const handleOnClick = () => {
        authServiceLogOut()
            .then((response) => {
                console.log(response);
                if (response.data?.success) {
                    showToast(response.data.ctx_content, 'success');
                }
            })
            .catch(err => {
                if (err.response?.data.ctx_content) {
                    const { ctx_content } = err.response.data;
                    showToast(ctx_content, 'error');
                }
            });
    }

    return (<div>
        <button onClick={handleOnClick} className='bg-red-600 p-2 rounded-lg text-white'>
            Cerrar sesión
        </button>
    </div>);
}