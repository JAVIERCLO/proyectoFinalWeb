import { useMemo } from 'react';

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CATEGORIAS } from '../../utils/categorias.js';

function GraficaPuntuacionCategorias({ items }) {
    const datos = useMemo(() => {
        return CATEGORIAS.map(categoria => {
            const itemsCategoria = items.filter(
                item =>
                    item.categoriaId === categoria.id &&
                    item.puntuacion !== null
            );
            const promedio = itemsCategoria.length === 0 ? 0: (
                        itemsCategoria.reduce(
                            (acc, item) => acc + item.puntuacion, 0
                        ) / itemsCategoria.length
                    );
            return {
                categoria: categoria.nombre,
                promedio: Number(promedio.toFixed(2))
            };
        });
    }, [items]);

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <RadarChart data={datos}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="categoria" />
                    <PolarRadiusAxis />
                    <Radar
                        name="Puntuación promedio"
                        dataKey="promedio"
                        fill="#FF6B00"
                        fillOpacity={0.5}
                    />
                    <Tooltip />
                    <Legend />
                </RadarChart>
            </ResponsiveContainer>

        </div>
    );
}

export default GraficaPuntuacionCategorias;