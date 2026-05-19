import { useState, useEffect } from "react";
import CrearItem from "./components/formularioItem";
import ItemList from "./components/listaItems";

function App() {
const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem('items') || '[]')
);

const agregarItem = (nuevoItem) => {
    setItems([...items, nuevoItem]);
};

const archivarItem = (id) => {
    setItems(
        items.map(item =>
            item.id === id
                ? { ...item, activo: false }
                : item
        )
    );
};

useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
}, [items]);

return (
    <div>
        <CrearItem onAgregarItem={agregarItem} />

        <ItemList
            items={items}
            onArchivarItem={archivarItem}
        />
    </div>
);
}

export default App;