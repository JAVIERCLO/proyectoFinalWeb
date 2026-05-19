import ItemCard from "./itemCard";

function ItemList({ items, onArchivarItem }) {
    return (
        <div className="item-list">
            <ul>
                {items
                    .filter(item => item.activo).map(item => (
                        <li key={item.id}>
                            <ItemCard{...item}onArchivarItem={onArchivarItem}/>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default ItemList;