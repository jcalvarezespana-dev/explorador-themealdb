import { Link } from 'react-router-dom';

export default function Tarjeta({ receta, esFavorito, onAlternar }) {
  return (
    <article className="tarjeta">
      <Link to={`/detalle/${receta.id}`} className="tarjeta-enlace">
        <img src={receta.imagen} alt={receta.nombre} loading="lazy" />
        <h3>{receta.nombre}</h3>
      </Link>
      <p className="tarjeta-datos">
        <span className="categoria">{receta.categoria}</span>
      </p>
      <button
        className={esFavorito ? 'boton boton-activo' : 'boton boton-claro'}
        onClick={() => onAlternar(receta)}
      >
        {esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      </button>
    </article>
  );
}
