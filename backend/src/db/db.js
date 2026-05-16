import postgres from 'postgres';

const db = postgres({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Crear tabla items
const crearTablaItems = async () => {
    try {
        await db`
        CREATE TABLE IF NOT EXISTS items (
        id UUID PRIMARY KEY,
        nombre VARCHAR(150) NOT NULL,
        categoriaId VARCHAR(255) NOT NULL,
        estado VARCHAR(25) NOT NULL,
        puntuacion NUMERIC CHECK (puntuacion BETWEEN 1 AND 10),
        fechaRegistro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        fechaActividad TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        notas TEXT,
        atributos JSONB,
        activo BOOLEAN NOT NULL DEFAULT TRUE
        )
        `
        console.log('Tabla creada exitosamente');
    } catch (error) {
        console.error('Error al crear la tabla:', error);
    }
}


const crearTablaRegistros = async () => {
    try {
        await db`
        CREATE TABLE IF NOT EXISTS registros (
        id SERIAL PRIMARY KEY,
        itemId UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
        fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        valor NUMERIC CHECK (valor BETWEEN 1 AND 10) NOT NULL,
        notas TEXT
        )
        `
        console.log('Tabla creada exitosamente');
    } catch (error) {
        console.error('Error al crear la tabla:', error);
    }
}
    
const ejecutarCreacionDeTablas = async () => {
    try {
        await crearTablaItems();
        await crearTablaRegistros();
        console.log('Tablas creadas exitosamente');
    } catch (error) {
        console.error('Error al crear las tablas:', error);
    }
}

ejecutarCreacionDeTablas();

export default db;