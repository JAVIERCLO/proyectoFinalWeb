function ItemCard({ nombre, categoriaId, estado, puntuacion, notas}) {
    return (
        <div className = "item-card">
            <h3>{ nombre }</h3>
            <p>{ categoriaId }</p>
            <p>{ estado }</p>
            <p>{ puntuacion }</p>
            <p>{ notas }</p>
        </div>
    );
}

export default ItemCard;