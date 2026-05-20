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
        if (tema === 'oscuro') {
            document.body.setAttribute('data-theme', 'oscuro');
        } else {
            document.body.setAttribute('data-theme', 'claro');
        }
    }, [tema]);
    return (
        <ThemeContext.Provider value={{ tema, setTema }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;