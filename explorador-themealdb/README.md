# Recetario Mundial

Aplicación web hecha con React y Vite para explorar recetas de todo el mundo: listado con búsqueda, filtro por categoría y paginación, detalle con ingredientes y preparación, favoritos guardados en el navegador y un registro de usuarios con CRUD completo.

## API utilizada

- **Nombre:** TheMealDB
- **URL base:** `https://www.themealdb.com/api/json/v1/1`
- **Endpoints:**
  - `GET /list.php?c=list` (categorías para el filtro)
  - `GET /filter.php?c={categoría}` (listado por categoría)
  - `GET /search.php?s={texto}` (búsqueda por nombre)
  - `GET /lookup.php?i={id}` (detalle)
- **Documentación:** https://www.themealdb.com/api.php

## Pantallas

| Ruta | Descripción |
| --- | --- |
| `/` | Presentación de la aplicación y de la API |
| `/lista` | Tarjetas, buscador, filtro por categoría y paginación |
| `/detalle/:id` | Ficha de la receta, ingredientes, preparación y botón de favoritos |
| `/favoritos` | Favoritos guardados en `localStorage` |
| `/registro` | CRUD de usuarios con validaciones (identificación única) |
| `*` | Página 404 |

## Ejecutar el proyecto

```bash
npm install
npm run dev
```

Para generar la versión de producción: `npm run build`.

## Capturas de pantalla

Agregar aquí las capturas 
inicio<img width="1600" height="772" alt="image" src="https://github.com/user-attachments/assets/e8792bac-3101-4f13-90e9-7c205bd28dd5" />


lista<img width="1600" height="773" alt="image" src="https://github.com/user-attachments/assets/253de00f-3bde-4c36-9a19-6af5c7a75eaa" />


detalle<img width="1600" height="751" alt="image" src="https://github.com/user-attachments/assets/42d04624-4621-4532-8abf-9d0465f223f2" />


favoritos<img width="1600" height="751" alt="image" src="https://github.com/user-attachments/assets/3675845c-7258-4887-9125-c894d710e735" />


registro<img width="1600" height="763" alt="image" src="https://github.com/user-attachments/assets/a70788a3-575f-4fb9-872e-b4082b59b3dc" />


vista en celuar



## Integrantes

- Juan Camilo Alvarez España
- Dainer David Barrios Charris
