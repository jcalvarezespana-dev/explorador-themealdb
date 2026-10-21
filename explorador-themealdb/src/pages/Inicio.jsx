import { Link } from 'react-router-dom';
import { API } from '../datos.js';

export default function Inicio() {
  return (
    <section className="inicio">
      <h1>Recetas de todo el mundo, a un clic de tu cocina</h1>
      <p>
        Busca recetas por nombre, filtra por categoría, revisa ingredientes y preparación, y guarda tus favoritas. También
        puedes llevar un registro de usuarios con su identificación, nombre y correo.
      </p>
      <p>
        Los datos vienen de <strong>{API.nombre}</strong>, una API pública y gratuita con recetas,
        ingredientes, categorías y videos de preparación.
      </p>
      <Link to="/lista" className="boton boton-activo">
        Ver recetas
      </Link>
    </section>
  );
}
