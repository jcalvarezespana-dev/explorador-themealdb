import { API } from '../datos.js';

async function pedir(ruta, signal) {
  const respuesta = await fetch(`${API.urlBase}${ruta}`, { signal });
  if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`);
  return respuesta.json();
}

function resumir(receta, categoria) {
  return {
    id: receta.idMeal,
    nombre: receta.strMeal,
    imagen: receta.strMealThumb,
    categoria: categoria ?? receta.strCategory,
  };
}

export async function obtenerCategorias(signal) {
  const datos = await pedir('/list.php?c=list', signal);
  return datos.meals.map((c) => c.strCategory);
}

export async function buscarPorNombre(texto, signal) {
  const datos = await pedir(`/search.php?s=${encodeURIComponent(texto)}`, signal);
  return (datos.meals || []).map((receta) => resumir(receta));
}

export async function filtrarPorCategoria(categoria, signal) {
  const datos = await pedir(`/filter.php?c=${encodeURIComponent(categoria)}`, signal);
  return (datos.meals || []).map((receta) => resumir(receta, categoria));
}

export async function obtenerReceta(id, signal) {
  const datos = await pedir(`/lookup.php?i=${encodeURIComponent(id)}`, signal);
  return datos.meals?.[0] ?? null;
}

export async function obtenerRecetas({ texto, categoria }, signal) {
  if (texto) {
    const encontradas = await buscarPorNombre(texto, signal);
    return categoria ? encontradas.filter((receta) => receta.categoria === categoria) : encontradas;
  }
  if (categoria) return filtrarPorCategoria(categoria, signal);

  const categorias = await obtenerCategorias(signal);
  const grupos = await Promise.all(categorias.map((c) => filtrarPorCategoria(c, signal)));
  return grupos.flat().sort((a, b) => a.nombre.localeCompare(b.nombre));
}
