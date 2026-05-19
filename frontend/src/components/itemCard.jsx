function ItemCard({
    id,
    nombre,
    categoriaId,
    estado,
    puntuacion,
    notas,
    onArchivarItem
}) {
    return (
        <div className="item-card">
            <h3>{nombre}</h3>

            <p>Categoría: {categoriaId}</p>
            <p>Estado: {estado}</p>
            <p>Puntuación: {puntuacion ?? 'Sin puntuación'}</p>
            <p>Notas: {notas || 'Sin notas'}</p>

            <button onClick={() => onArchivarItem(id)}>
                Archivar
            </button>
        </div>
    );
}

export default ItemCard;