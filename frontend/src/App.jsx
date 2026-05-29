import { useContext, useReducer, useMemo, useCallback, memo } from "react";
import CrearItem from "./components/formularioItem";
import ItemList from "./components/listaItems";
import StorageContext from "./context/storageProvider";
import ThemeContext from "./context/themeProvider";

function App() {
    const { modo, setModo } = useContext(StorageContext);
    const { tema, setTema } = useContext(ThemeContext);
    const [estado, dispatch] = useReducer(itemsReducer, estadoInicial);

    return (
        <div>

            {/* top bar */}
            <div id="top-bar">

                <h1 id="main-title">
                    Travel Tracker
                </h1>

                {/* navbar */}
                <div id="navbar">

                    {/* Toggle tema */}
                    <button className="btn btn-primary" onClick={() => setTema(tema === 'oscuro' ? 'claro' : 'oscuro')}>
                        Tema: {tema}
                    </button>

                    {/* Toggle modo */}
                    <button className="btn btn-secondary" onClick={() => setModo(modo === 'api' ? 'local' : 'api')}>
                        Modo: {modo}
                    </button>

                </div>

            </div>

            {/* formulario */}
            <div id="form-section">
                <CrearItem />
            </div>

            {/* itemList */}
            <ItemList />

        </div>
    );
}

export default App;