import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Mensaje from '../components/Mensaje.jsx';
import { obtenerReceta } from '../services/api.js';

function extraerIngredientes(receta) {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `${receta.idMeal}-ingrediente-${i + 1}`,
    nombre: receta[`strIngredient${i + 1}`],
    medida: receta[`strMeasure${i + 1}`],
  })).filter((ingrediente) => ingrediente.nombre && ingrediente.nombre.trim());
}

export default function Detalle({ esFavorito, alternar }) {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const control = new AbortController();

    async function cargar() {
      setCargando(true);
      setError(null);
      setReceta(null);
      try {
        setReceta(await obtenerReceta(id, control.signal));
      } catch (e) {
        if (e.name !== 'AbortError') setError('No pudimos cargar esta receta. Inténtalo de nuevo.');
      } finally {
        if (!control.signal.aborted) setCargando(false);
      }
    }

    cargar();
    return () => control.abort();
  }, [id]);

  if (cargando) return <Mensaje tipo="info">Cargando receta…</Mensaje>;
  if (error) return <Mensaje tipo="error">{error}</Mensaje>;
  if (!receta) {
    return (
      <>
        <Mensaje tipo="info">No existe una receta con el identificador {id}.</Mensaje>
        <Link to="/lista" className="boton boton-claro">Volver al listado</Link>
      </>
    );
  }

  const ingredientes = extraerIngredientes(receta);
  const pasos = receta.strInstructions
    .split(/\r?\n/)
    .filter((texto) => texto.trim())
    .map((texto, i) => ({ id: `${receta.idMeal}-paso-${i + 1}`, texto }));
  const resumen = {
    id: receta.idMeal,
    nombre: receta.strMeal,
    imagen: receta.strMealThumb,
    categoria: receta.strCategory,
  };
  const datos = [
    ['Categoría', receta.strCategory],
    ['Origen', receta.strArea],
    ['Etiquetas', receta.strTags ? receta.strTags.split(',').join(', ') : 'Sin etiquetas'],
    ['Ingredientes', ingredientes.length],
    [
      'Video',
      receta.strYoutube ? (
        <a href={receta.strYoutube} target="_blank" rel="noreferrer">Ver en YouTube</a>
      ) : (
        'No disponible'
      ),
    ],
  ];

  return (
    <>
      <section className="detalle">
        <img src={receta.strMealThumb} alt={receta.strMeal} />
        <div>
          <h1>{receta.strMeal}</h1>
          <dl>
            {datos.map(([etiqueta, valor]) => (
              <div key={etiqueta}>
                <dt>{etiqueta}</dt>
                <dd>{valor}</dd>
              </div>
            ))}
          </dl>
          <div className="detalle-botones">
            <button
              className={esFavorito(resumen.id) ? 'boton boton-activo' : 'boton boton-claro'}
              onClick={() => alternar(resumen)}
            >
              {esFavorito(resumen.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </button>
            <Link to="/lista" className="boton boton-claro">Volver al listado</Link>
          </div>
        </div>
      </section>

      <section className="receta">
        <h2>Ingredientes</h2>
        <ul className="ingredientes">
          {ingredientes.map((ingrediente) => (
            <li key={ingrediente.id}>
              <strong>{ingrediente.nombre}</strong>
              <span>{ingrediente.medida}</span>
            </li>
          ))}
        </ul>
        <h2>Preparación</h2>
        {pasos.map((paso) => (
          <p key={paso.id}>{paso.texto}</p>
        ))}
      </section>
    </>
  );
}
