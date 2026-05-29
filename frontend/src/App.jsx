import { useContext, useReducer, useMemo, useCallback, memo } from "react";
import CrearItem from "./components/formularioItem";
import ItemList from "./components/listaItems";
import StorageContext from "./context/storageProvider";
import ThemeContext from "./context/themeProvider";
import GraficaPuntuacionCategorias from "./components/graficas/graficaPuntuacion.js";
import GraficaBarrasEstadosViajes from "./components/graficas/graficaBarras.js";
import GraficoPieCategorias from "./components/graficas/graficaPIE.js";

function App() {
    const { modo, setModo } = useContext(StorageContext);
    const { tema, setTema } = useContext(ThemeContext);
    const { items } = useContext(StorageContext);

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

            {/* Graficas */}
            <div id="charts-section">

                <GraficaPuntuacionCategorias items={items} />

                <GraficaBarrasEstadosViajes items={items} />

                <GraficoPieCategorias items={items} />

            </div>

        </div>
    );
}

export default App;