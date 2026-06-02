import { createContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const ThemeContext = createContext();
export function ThemeProvider({ children }) {
    const [tema, setTema] = useLocalStorage('tema', 'oscuro');

    useEffect(() => {

        document.body.setAttribute('data-theme', tema);

        // ataho ctrl + i para cambiar el tema
        const manejarAtajo = (e) => {
            
            if (e.ctrlKey && e.key === 'i') {
                e.preventDefault();
                setTema(tema === 'oscuro' ? 'claro' : 'oscuro');
            }
        };
        window.addEventListener('keydown', manejarAtajo);

        return () => {
            window.removeEventListener('keydown', manejarAtajo);
        };

    }, [tema]);


    return (
        <ThemeContext.Provider value={{ tema, setTema }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;