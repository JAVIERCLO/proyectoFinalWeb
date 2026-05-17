import express from 'express';
import db from '../db/db.js';
import crypto from 'crypto';
const router = express.Router();

// Ruta para obtener todos los items
router.get('/', async (req, res) => {
    try {
        const items = await db`
        SELECT * FROM items WHERE activo = true
            ORDER BY fechaRegistro DESC
        `;
        res.json(items);
        
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los items' });
    }
});

// Ruta para crear un nuevo item
router.post('/', async (req, res) => {
    try {
        const { nombre, categoriaId, estado, puntuacion, notas, atributos} = req.body;

        // Validar campos obligatorios
        if (!nombre || !categoriaId || !estado) {
            return res.status(400).json({
                error: 'faltan campos obligatorios'
            });
        }

        // campos opcionales
        const puntuacionFinal = puntuacion ?? null;
        const notasFinal = notas ?? null;
        const atributosFinal = atributos ?? null;

        // Insertar item en DB
        const result = await db`
        INSERT INTO items (id, nombre, categoriaId, estado, puntuacion, notas, atributos)
        VALUES (${crypto.randomUUID()}, ${nombre}, ${categoriaId}, ${estado}, ${puntuacionFinal}, ${notasFinal}, ${atributosFinal})
        RETURNING *
        `;

        res.status(201).json({
            item: result[0]
        });

    } catch (error) {
        res.status(500).json({ error: 'Error al crear el destino' });
    }
});

export default router;