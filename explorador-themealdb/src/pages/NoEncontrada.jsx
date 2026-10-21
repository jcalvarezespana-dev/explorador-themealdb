import { Link } from 'react-router-dom';

export default function NoEncontrada() {
  return (
    <section className="inicio">
      <h1>Esta página no existe</h1>
      <p>La dirección que abriste no corresponde a ninguna pantalla de la aplicación.</p>
      <Link to="/" className="boton boton-activo">Volver al inicio</Link>
    </section>
  );
}
