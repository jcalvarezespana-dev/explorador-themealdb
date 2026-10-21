import { API, INTEGRANTES } from '../datos.js';

export default function Footer() {
  return (
    <footer className="footer">
      <p>Integrantes: {INTEGRANTES.join(', ')}</p>
      <p>
        API: {API.nombre} ·{' '}
        <a href={API.documentacion} target="_blank" rel="noreferrer">
          Documentación
        </a>
      </p>
    </footer>
  );
}
