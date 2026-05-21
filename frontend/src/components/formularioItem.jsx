import { useState, useContext, useRef, useEffect } from 'react';
import StorageContext from '../context/storageProvider';

function CrearItem() {
    const inputRef = useRef();
    const intervalRef = useRef();
    const { guardarItem } = useContext(StorageContext);
    const [nombre, setNombre] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [estado, setEstado] = useState('');
    const [puntuacion, setPuntuacion] = useState('');
    const [notas, setNotas] = useState('');

        // Atajo del teclado
    useEffect(() => {
        const manejarAtajo = (e) => {
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                inputRef.current.focus();
            }
        };
        window.addEventListener('keydown', manejarAtajo);

        return () => {
            window.removeEventListener('keydown', manejarAtajo);
        };
    }, []);

    const ingresarItem = (e) => {
        e.preventDefault();

        // Validar campos obligatorios
        if (!nombre || !categoriaId || !estado) {
            alert('Completa los campos obligatorios');
            return;
        }

        const nuevoItem = {
            id: crypto.randomUUID(),
            nombre,
            categoriaId,
            estado,
            puntuacion: puntuacion ? Number(puntuacion) : null,
            fechaRegistro: new Date().toISOString(),
            fechaActividad: new Date().toISOString(),
            atributos: {},
            notas,
            activo: true
        };

        guardarItem(nuevoItem);
        inputRef.current.focus();
        

        // Limpiar formulario
        setNombre('');
        setCategoriaId('');
        setEstado('');
        setPuntuacion('');
        setNotas('');
    };

    return (
        <form onSubmit={ingresarItem}>
            <input ref = {inputRef} value={nombre}onChange={e => setNombre(e.target.value)}placeholder="Nombre"/>
            <input value={categoriaId}onChange={e => setCategoriaId(e.target.value)}placeholder="ID de Categoría"/>
            <input value={estado}onChange={e => setEstado(e.target.value)}placeholder="Estado"/>
            <input type="number"value={puntuacion}onChange={e => setPuntuacion(e.target.value)}placeholder="Puntuación"/>
            <input value={notas}onChange={e => setNotas(e.target.value)}placeholder="Notas"/>
            <button type="submit">
                Ingresar Item
            </button>
        </form>
    );
}

export default CrearItem;