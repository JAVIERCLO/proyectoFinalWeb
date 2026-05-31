import { useContext, useMemo, useCallback } from "react";
import CrearItem from "./components/formularioItem";
import ItemList from "./components/listaItems";
import StorageContext from "./context/storageProvider";
import ThemeContext from "./context/themeProvider";
import GraficaPuntuacionCategorias from "./components/graficas/graficaPuntuacion.jsx";
import GraficaBarrasEstadosViajes from "./components/graficas/graficaBarras.jsx";
import GraficoPieCategorias from "./components/graficas/graficaPIE.jsx";

function App() {
    const { modo, setModo } = useContext(StorageContext);
    const { tema, setTema } = useContext(ThemeContext);
    const { estado } = useContext(StorageContext);

    const itemsFiltrados = useMemo(() => {
    let res = estado.lista.filter(item => item.activo);

    if (estado.busqueda) {
        res = res.filter(item =>
            item.nombre
                .toLowerCase()
                .includes(
                    estado.busqueda.toLowerCase()
                )
        );
    }

    if (estado.filtroCategoria !== 'todas') {
        res = res.filter(item =>
            item.categoriaId === estado.filtroCategoria
        );
    }

    if (estado.filtroEstado !== 'todos') {
        res = res.filter(item =>
            item.estado === estado.filtroEstado
        );
    }

    return res;

    }, [
        estado.lista,
        estado.busqueda,
        estado.filtroCategoria,
        estado.filtroEstado
    ]);

    const estadisticas = useMemo(() => {
        // Total de items
        const total = estado.lista.length;
        // Total de items activos
        const activos = estado.lista.filter(item => item.activo).length;
        // Total de items archivados
        const archivados = estado.lista.filter(item => !item.activo).length;
        // Quitar los items sin puntuación
        const itemsConPuntuacion = estado.lista.filter(item => item.puntuacion !== null);
        // Puntuación promedio de los items
        const puntuacionPromedio = itemsConPuntuacion.length === 0 ? 0 : ( itemsConPuntuacion.reduce(
            (acc, item) => acc + item.puntuacion, 0 ) / itemsConPuntuacion.length);

        return {
            total, activos, archivados, puntuacionPromedio: Number(puntuacionPromedio.toFixed(1))
        };
    }, [estado.lista]);

    const toggleTema = useCallback(() => {
        setTema(tema === 'oscuro' ? 'claro' : 'oscuro');
    }, [tema]);

    const toggleModo = useCallback(() => {
        setModo(modo === 'api' ? 'local' : 'api');
    }, [modo]);

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
                    <button className="btn btn-primary" onClick={toggleTema}>
                        Tema: {tema}
                    </button>

                    {/* Toggle modo */}
                    <button className="btn btn-secondary" onClick={toggleModo}>
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

                
                
                <GraficoPieCategorias items={itemsFiltrados} />
                <GraficaBarrasEstadosViajes items={itemsFiltrados} />
                <GraficaPuntuacionCategorias items={itemsFiltrados} />




            </div>

        </div>
    );
}

export default App;