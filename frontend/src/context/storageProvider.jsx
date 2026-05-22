import { createContext, useState, useEffect, useCallback } from 'react';
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
        } else {
            const data = localStorage.getItem('items');
            return data ? JSON.parse(data) : [];
        }
        } catch (err) {
        setError(err.message); return [];
        } finally { setCargando(false); }
    }, [modo]);

    const [items, setItems] = useState(
        () => JSON.parse(localStorage.getItem('items') || '[]')
    );

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
                setItems(prev => [...prev, nuevoItem]);
                return nuevoItem;
            } else {
                // local Storage
                const nuevosItems = [...items, item];
                setItems(nuevosItems);
                localStorage.setItem('items', JSON.stringify(nuevosItems));
                return item;
            }
        } catch (err) {
            setError(err.message); return [];
        } finally {
            setCargando(false);
        }
    }, [modo, items]);

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
                const nuevosItems = items.map(item => (item.id === id ? itemEliminado : item));
                setItems(nuevosItems);
                return itemEliminado;
            } else {
                // local Storage
                const nuevosItems = items.map(item => item.id === id ? {...item, activo: false}: item);
                setItems(nuevosItems);
                localStorage.setItem('items', JSON.stringify(nuevosItems));
                return id;
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    }, [modo, items]);

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    return (
        <StorageContext.Provider value={{
        modo, setModo, cargando, error,
        obtenerItems, guardarItem, archivarItem, items
        }}>
        {children}
        </StorageContext.Provider>
    );
}

export default StorageContext;