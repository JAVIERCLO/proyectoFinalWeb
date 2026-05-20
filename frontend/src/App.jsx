import { useState, useEffect } from "react";
import CrearItem from "./components/formularioItem";
import ItemList from "./components/listaItems";

function App() {
    return (
        <div>
            <CrearItem />
            <ItemList />
        </div>
    );
}

export default App;