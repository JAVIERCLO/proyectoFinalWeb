import { createContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { useAtajoTeclado } from '../hooks/useAtajoTeclado.js';
const ThemeContext = createContext();
export function ThemeProvider({ children }) {
    const [tema, setTema] = useLocalStorage('tema', 'oscuro');

        // ataho ctrl + i para cambiar el tema
    useAtajoTeclado('i', () => {
        setTema(tema === 'oscuro' ? 'claro' : 'oscuro');
    }, { ctrl: true });
    useEffect(() => {

        document.body.setAttribute('data-theme', tema);
    }, [tema]);


    return (
        <ThemeContext.Provider value={{ tema, setTema }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;