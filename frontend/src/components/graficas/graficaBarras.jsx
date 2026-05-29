import { useMemo } from 'react';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function GraficaBarrasEstadosViajes({ items }) {
    const datos = useMemo(() => {
        const estados = {};
        items.forEach(item => {
            if (!estados[item.estado]) {
                estados[item.estado] = 0;
            }
            estados[item.estado]++;
        });
        return Object.entries(estados).map(
            ([estado, cantidad]) => ({
                estado,
                cantidad
            })
        );
    }, [items]);
    return (
        <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
                <BarChart data={datos}>
                    <XAxis dataKey="estado" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="cantidad"
                        fill="#FF6B00"
                    />
                </BarChart>
            </ResponsiveContainer>

        </div>
    );
}

export default GraficaBarrasEstadosViajes;