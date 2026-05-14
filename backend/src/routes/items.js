import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.json([{
            id: 1,
            nombre: 'Francia'
        }])
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los items' });
    }
});

export default router;