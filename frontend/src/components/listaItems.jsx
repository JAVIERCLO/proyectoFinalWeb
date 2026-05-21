import { useContext, useRef, useEffect } from 'react';
import StorageContext from '../context/storageProvider';
import ItemCard from "./itemCard";


function ItemList() {
    const {items, archivarItem} = useContext(StorageContext);
    const ultimoItemRef = useRef();
    // items activos
    const itemsActivos = items.filter(item => item.activo);

    // Scrolll automático al último elemento agregado
    useEffect(() => {
        if (ultimoItemRef.current) {
            ultimoItemRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [itemsActivos]);
    
    return (
        <div className="item-list">
            <ul>
                {itemsActivos.length === 0 ? (
                    <p>No hay items registrados</p>
                ): itemsActivos.map(item => (
                        <li key={item.id} ref={item.id === itemsActivos[itemsActivos.length - 1].id ? ultimoItemRef : null}>
                            <ItemCard {...item} />
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default ItemList;