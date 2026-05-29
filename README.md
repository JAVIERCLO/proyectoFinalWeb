📌 Proyecto final Web

🧾 Descripción

Proyecto final de sistemas y tecnologías web sobre un diario de registro de viajes



🛠️ Herramientas utilizadas

React

Vite

Docker

Express

postgreSQL

Librerías

react

crypto

▶️ Instrucciones para ejecutar el proyecto
1. Clonar repositorio
git clone http://github.com/JAVIERCLO/proyectoFinalWeb/tree/fase3
2. Entrar al proyecto
cd proyectoFinalWeb
3. Instalar dependencias
npm install
4. Ejecutar el proyecto
npm run dev (frontend)
docker-compose up --build (backend + base de datos)

👥 Integrantes

Javier Chávez

### Mi gráfica original
Elegí una gráfica en forma de radar que presenta las puntuaciones promedio de cada categoría, la elegí porque me gusta mucho cómo se ven este tipo de gráficas en juegos que he jugado como FIFA, además, me parece valioso ver qué categorías tienen mejores puntuaciones porque pueden ayudar a tomar desiciones sobre el próximo viaje, y en un gráfico de radar es fácil ver todas las categorías en el mismo lugar sin tener que mover mucho los ojos.

### Mis 3 desiciones técnicas
Estructura del reducer: Utilicé como base el código proporcionado en la página del proyecto, que incluye las acciones: HIDRATAR, AGREGAR, ELIMINAR, CAMBIAR_ESTADO, FILTRAR, LIMPIAR_FILTROS. Así que solamente fue necesario agregar la acción de registrar actividad, que interactará con la tabla Registros de la base de datos para modificar el historial del item.

Acción más difícil de implementar: Gracias a que pude reciclar la mayoría del código proporcionado, la acción más difícil de implementar fue Registrar actividad, sin embargo, pude basarme en las demás acciones para que la lógica de cambiar el estado se mantenga, pero fue necesario lograr que interactúe con la estructura creada dentro del item y no directamente con la lista principal.

Gráfica más compleja,  qué datos transforma y cómo: La gráfica de puntuación por categoría. Esta no usa los datos directamente como las otras, sino que primero se necesita agrupar los items por categoría usando categoriaID. Después de esto se deben filtrar los que tienen una puntuación válida y calcular el promedio de la puntuación de cada categoría. Después de esto se transforman al formato que pide Recharts. Elegí esta gráfica porque en un solo lugar se puede ver la puntuación para todas las categorías, además de que me gusta mucho visualmente este tipo de gráficas porque las he visto en videojuegos que he jugado antes.

---

