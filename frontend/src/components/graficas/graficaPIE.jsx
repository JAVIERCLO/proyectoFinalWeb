import { useMemo } from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

import { CATEGORIAS } from '../../utils/categorias.js';

// Grafico de pie para mostrar la proporción de items por categoría
function GraficoPieCategorias({ items }) {
    const datos = useMemo(() => {

        return CATEGORIAS.map(categoria => {

            const cantidad = items.filter(
                item => item.categoriaId === categoria.id
            ).length;

            return {
                name: categoria.nombre,
                value: cantidad,
                color: categoria.color
            };

        }).filter(categoria => categoria.value > 0);

    }, [items]);

    return (
        <div style={{ width: '100%', height: 350 }}>

            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={datos}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={120}
                    >
                        {datos.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={entry.color}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default GraficoPieCategorias;