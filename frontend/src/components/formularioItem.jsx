import { useState } from 'react';

function CrearItem() {
    const [nombre, setNombre] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [estado, setEstado] = useState('');
    const [puntuacion, setPuntuacion] = useState('');
    const [notas, setNotas] = useState('');

    const ingresarItem = (e) => {
        e.preventDefault();
        const nuevoItem = {
            nombre,
            categoriaId,
            estado,
            puntuacion,
            notas
        };
        // Aquí puedes agregar la lógica para enviar el nuevo item a tu backend o actualizar el estado de tu aplicación
};

    return (
        <form onSubmit = {ingresarItem}>
            <input value = {nombre} onChange = {e => setNombre(e.target.value)} placeholder = "Nombre"> </input>
            <input value = {categoriaId} onChange = {e => setCategoriaId(e.target.value)} placeholder = "ID de Categoría"> </input>
            <input value = {estado} onChange = {e => setEstado(e.target.value)} placeholder = "Estado"> </input>
            <input value = {puntuacion} onChange = {e => setPuntuacion(e.target.value)} placeholder = "Puntuación"> </input>
            <input value = {notas} onChange = {e => setNotas(e.target.value)} placeholder = "Notas"> </input>
            <button type = "submit">Ingresar Item</button>
        </form>
    ) 
}

export default CrearItem;