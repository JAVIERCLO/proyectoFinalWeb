export const estadoInicial = {
  lista: [], filtroCategoria: 'todas',
  filtroEstado: 'todos', busqueda: '',
};

export function itemsReducer(estado, accion) {
  switch (accion.type) {
    case 'HIDRATAR':
      return { ...estado, lista: accion.payload };
    case 'AGREGAR':
      return { ...estado, lista: [...estado.lista, accion.payload] };
    case 'ELIMINAR':
      return {
        ...estado,
        lista: estado.lista.map(i =>
          i.id === accion.payload ? { ...i, activo: false } : i
        ),
      };
    case 'CAMBIAR_ESTADO':
      return {
        ...estado,
        lista: estado.lista.map(i =>
          i.id === accion.payload.id
            ? { ...i, estado: accion.payload.estado }
            : i
        ),
      };
    case 'FILTRAR':
      return { ...estado, [accion.payload.campo]: accion.payload.valor };
    case 'LIMPIAR_FILTROS':
      return { ...estado, filtroCategoria: 'todas',
               filtroEstado: 'todos', busqueda: '' };
    default:
      throw new Error(`Acción desconocida: ${accion.type}`);
    case 'REGISTRAR_ACTIVIDAD':
      return {
        ...estado,
        lista: estado.lista.map(item =>
          item.id === accion.payload.itemId
            ? {
                ...item,
                registros: [
                  ...(item.registros || []),
                  accion.payload.registro
                ]
              }
            : item
        )
      };
  }
}



// En el componente — lista filtrada con useMemo:
const itemsVisibles = useMemo(() => {
  let res = estado.lista.filter(i => i.activo);
  if (estado.busqueda)
    res = res.filter(i =>
      i.nombre.toLowerCase().includes(estado.busqueda.toLowerCase()));
  if (estado.filtroCategoria !== 'todas')
    res = res.filter(i => i.categoriaId === estado.filtroCategoria);
  if (estado.filtroEstado !== 'todos')
    res = res.filter(i => i.estado === estado.filtroEstado);
  return res;
}, [estado.lista, estado.busqueda, estado.filtroCategoria, estado.filtroEstado]);