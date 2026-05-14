import express from 'express';
import cors from 'cors';
import itemsRouter from './routes/items.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/items', itemsRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto: ${PORT}`);
});