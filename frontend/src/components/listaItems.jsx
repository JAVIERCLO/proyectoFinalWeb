import { useContext } from 'react';
import StorageContext from '../context/storageProvider';
import ItemCard from "./itemCard";


function ItemList() {
    const {items, archivarItem} = useContext(StorageContext);

    return (
        <div className="item-list">
            <ul>
                {items
                    .filter(item => item.activo).map(item => (
                        <li key={item.id}>
                            <ItemCard {...item} />
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default ItemList;