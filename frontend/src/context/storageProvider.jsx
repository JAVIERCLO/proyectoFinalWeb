import { createContext, useState, useEffect, useCallback, useReducer } from 'react';
import { itemsReducer, estadoInicial} from '../reducers/itemsReducer.js';

const StorageContext = createContext();

export function StorageProvider({ children }) {
    const [modo, setModoState] = useState(() =>
        localStorage.getItem('modo') || 'api'
    );
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    const setModo = (nuevoModo) => {
        setModoState(nuevoModo);
        localStorage.setItem('modo', nuevoModo);
    };

    // obtener items desde API o localStorage
    const obtenerItems = useCallback(async () => {
        setCargando(true); setError(null);
        try {
        if (modo === 'api') {
            const res = await fetch(`${API_URL}/api/items`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
            dispatch({ type: 'HIDRATAR', payload: data });
            return data;
        } else {
            const data = localStorage.getItem('items');
            return data ? JSON.parse(data) : [];
            dispatch({ type: 'HIDRATAR', payload: items });
            return items;
        }
        } catch (err) {
        setError(err.message); return [];
        } finally { setCargando(false); }
    }, [modo]);

    const [estado, dispatch] = useReducer(itemsReducer, estadoInicial);

    // guardar item en BD con API o en localStorage
    const guardarItem = useCallback(async (item) => {
        setCargando(true); setError(null);
        try {
            // modo API
            if (modo === 'api') {
                const res = await fetch(`${API_URL}/api/items`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item)
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                
                const data = await res.json();
                const nuevoItem = data.item;
                dispatch({ type: 'AGREGAR', payload: nuevoItem });
                return nuevoItem;
            } else {
                // local Storage
                dispatch({ type: 'AGREGAR', payload: item });
                return item;
            }
        } catch (err) {
            setError(err.message); return [];
        } finally {
            setCargando(false);
        }
    }, [modo]);

    const archivarItem = useCallback(async (id) => {
        setCargando(true); setError(null);
        try {
            // modo API
            if (modo === 'api') {
                const res = await fetch(`${API_URL}/api/items/${id}`, {
                    method: 'DELETE',
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                const itemEliminado = data.item;
                dispatch({ type: 'ELIMINAR', payload: id });
                return itemEliminado;
            } else {
                // local Storage
                dispatch({ type: 'ELIMINAR', payload: id });
                return id;
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    }, [modo]);

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(estado.lista));
    }, [estado.lista]);

    return (
        <StorageContext.Provider value={{
        modo, setModo, cargando, error,
        obtenerItems, guardarItem, archivarItem, items: estado.lista, 
        dispatch
        }}>
        {children}
        </StorageContext.Provider>
    );
}

export default StorageContext;