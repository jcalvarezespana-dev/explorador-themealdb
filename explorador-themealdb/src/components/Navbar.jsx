import { Link, NavLink } from 'react-router-dom';

export default function Navbar({ totalFavoritos, totalUsuarios }) {
  const clase = ({ isActive }) => (isActive ? 'enlace activo' : 'enlace');

  return (
    <header className="navbar">
      <Link to="/" className="marca">
        Recetario<span>Mundial</span>
      </Link>
      <nav className="enlaces">
        <NavLink to="/" end className={clase}>Inicio</NavLink>
        <NavLink to="/lista" className={clase}>Lista</NavLink>
        <NavLink to="/favoritos" className={clase}>
          Favoritos <b className="contador">{totalFavoritos}</b>
        </NavLink>
        <NavLink to="/registro" className={clase}>
          Registro <b className="contador">{totalUsuarios}</b>
        </NavLink>
      </nav>
    </header>
  );
}
