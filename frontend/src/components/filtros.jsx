import { useContext } from 'react';
import StorageContext from '../context/storageProvider';

function Filtros() {
    const { estado, dispatch } = useContext(StorageContext);

    return (
        <div id="filters-container">
            <input
                placeholder="Buscar"
                value={estado.busqueda}
                onChange={(e) => dispatch({ type: 'FILTRAR', payload: { campo: 'busqueda', valor: e.target.value } })}
                />

            <select
                value={estado.filtroCategoria}
                onChange={(e) => dispatch({ type: 'FILTRAR', payload: {campo: 'filtroCategoria', valor: e.target.value} })}
            >
                <option value="todas">Todas</option>
                <option value="ciudad">Ciudad</option>
                <option value="naturaleza">Naturaleza</option>
                <option value="playa">Playa</option>
                <option value="historia">Historia</option>
                <option value="comida">Gastronómico</option>
            </select>

            <select
                value={estado.filtroEstado}
                onChange={(e) => dispatch({ type: 'FILTRAR', payload: {campo: 'filtroEstado', valor: e.target.value }})}
            >
                <option value="todos">Todos</option>
                <option value="planeado">Planeado</option>
                <option value="completado">Completado</option>
            </select>

            <button onClick={() => dispatch({ type: 'LIMPIAR_FILTROS' })}>
                Limpiar filtros
            </button>
        </div>
    );
}

export default Filtros;