import { useCallback } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export function useSweetAlert() {
    const MySwal = withReactContent(Swal);
    const showSweetAlert = useCallback(async (options) => {
        return MySwal.fire({
            ...options,
        });
    }, []);

    return { showSweetAlert, Swal };
}