import { Link } from 'react-router-dom';
import Tarjeta from '../components/Tarjeta.jsx';
import Mensaje from '../components/Mensaje.jsx';

export default function Favoritos({ favoritos, alternar }) {
  return (
    <section>
      <h1>Favoritos</h1>
      {favoritos.length === 0 ? (
        <>
          <Mensaje tipo="info">Todavía no guardaste favoritos. Agrégalos desde el listado.</Mensaje>
          <Link to="/lista" className="boton boton-activo">Ir al listado</Link>
        </>
      ) : (
        <div className="grilla">
          {favoritos.map((receta) => (
            <Tarjeta key={receta.id} receta={receta} esFavorito onAlternar={alternar} />
          ))}
        </div>
      )}
    </section>
  );
}
