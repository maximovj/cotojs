import { useToast } from '../../hooks/useToast.js';
import { mainServicePrivado } from '../../services/mainService.js';

export function News() {
    const showToast = useToast();

    const handleOnClick = () => {
        mainServicePrivado()
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
        <button onClick={handleOnClick} className='bg-red-600 p-2 rounded-lg text-white'>Probar</button>
    </div>);
}