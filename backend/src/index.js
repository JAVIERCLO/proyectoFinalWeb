import express from 'express';
import cors from 'cors';
import itemsRouter from './routes/items.js';
import db from './db/db.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/items', itemsRouter);

// Prueba de conexión a la base de datos
await db`SELECT 1`
    .then(() => console.log('Conexión exitosa a postgres'))
    .catch(err => console.error('Error de conexión:', err));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto: ${PORT}`);
});