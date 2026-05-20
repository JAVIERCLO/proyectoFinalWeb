import { useState, useEffect, useContext } from "react";
import CrearItem from "./components/formularioItem";
import ItemList from "./components/listaItems";
import ThemeContext from "./context/themeProvider";

function App() {
    const { tema, setTema } = useContext(ThemeContext);
        return (
            <div>
                {/* botón de prueba para cambio de tema */}
                <button onClick = {() => setTema(tema === 'oscuro' ? 'claro' : 'oscuro')}></button>
                <CrearItem />
                <ItemList />
            </div>
        );
}

export default App;