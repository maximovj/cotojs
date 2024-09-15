import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/es';
import { useCallback } from 'react';

// Configurar days.js
dayjs.locale('es');
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

// Crear un hook para days.js
export const useDayjs = () => {
    // Usamos useCallback para evitar que la referencia de dayjs cambie en cada renderizado
    const dayjsInstance = useCallback((...args) => dayjs(...args), []);
    return dayjsInstance;
}
