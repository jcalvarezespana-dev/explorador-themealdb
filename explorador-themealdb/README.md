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

Agregar aquí las capturas (inicio, lista, detalle, favoritos, registro y vista en celular).

## Integrantes

- Juan Camilo Alvarez España
- Dainer David Barrios Charris
