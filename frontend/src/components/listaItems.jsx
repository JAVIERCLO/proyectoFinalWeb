function ItemList({ items }) {
    return (
        <div className = "item-list">
            <ul>
                {items.map(item => {
                    <li key = {item.id}>
                        {item.nombre} - {item.categoriaId} - {item.estado} - {item.puntuacion} - {item.notas}
                    </li>
                })}
            </ul>
        </div>
    );
}