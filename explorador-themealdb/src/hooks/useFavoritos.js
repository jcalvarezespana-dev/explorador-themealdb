import { useEffect, useState } from 'react';

const CLAVE = 'favoritos-recetas';

function leerGuardados() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || [];
  } catch {
    return [];
  }
}

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState(leerGuardados);

  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(favoritos));
  }, [favoritos]);

  const esFavorito = (id) => favoritos.some((f) => f.id === id);

  const alternar = (receta) => {
    setFavoritos((actuales) =>
      actuales.some((f) => f.id === receta.id)
        ? actuales.filter((f) => f.id !== receta.id)
        : [
            ...actuales,
            { id: receta.id, nombre: receta.nombre, imagen: receta.imagen, categoria: receta.categoria },
          ]
    );
  };

  return { favoritos, esFavorito, alternar };
}
