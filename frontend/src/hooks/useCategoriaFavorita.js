import { useMemo } from 'react';
import { CATEGORIAS } from '../utils/categorias';

/**
 * hook para calcular la categoría con más viajes.
 *
 * @param {Array} items Lista de items registrados.
 * @returns {Object|null} Categoría favorita o null si no hay items.
 */
export function useCategoriaFavorita(items) {

    return useMemo(() => {

        if (!items.length) {
            return null;
        }

        const contador = {};

        items.forEach(item => {
            contador[item.categoriaId] =(contador[item.categoriaId] || 0) + 1;
        });

        const categoriaIdFavorita = Object.keys(contador).reduce((a, b) =>contador[a] > contador[b] ? a: b);

        const categoria =CATEGORIAS.find(c => c.id === categoriaIdFavorita);

        return {
            ...categoria,
            cantidad: contador[categoriaIdFavorita]
        };

    }, [items]);
}