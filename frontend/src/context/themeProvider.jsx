import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();
export function ThemeProvider({ children }) {
    const [tema, setTemaState] = useState (() => {
        return localStorage.getItem('tema') || 'oscuro'
    });
    const setTema = (nuevoTema) => {
    setTemaState(nuevoTema);
    localStorage.setItem('tema', nuevoTema);
    };

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
            console.log(tema);
        };

    }, [tema]);


    return (
        <ThemeContext.Provider value={{ tema, setTema }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;