import { useEffect, useState } from 'react';
import Tarjeta from '../components/Tarjeta.jsx';
import Buscador from '../components/Buscador.jsx';
import Paginacion from '../components/Paginacion.jsx';
import Mensaje from '../components/Mensaje.jsx';
import { obtenerCategorias, obtenerRecetas } from '../services/api.js';
import { useRetraso } from '../hooks/useRetraso.js';
import { RECETAS_POR_PAGINA } from '../datos.js';

export default function Lista({ esFavorito, alternar }) {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [recetas, setRecetas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const texto = useRetraso(busqueda.trim());

  useEffect(() => {
    const control = new AbortController();
    obtenerCategorias(control.signal)
      .then(setCategorias)
      .catch(() => setCategorias([]));
    return () => control.abort();
  }, []);

  useEffect(() => {
    const control = new AbortController();

    async function cargar() {
      setCargando(true);
      setError(null);
      try {
        setRecetas(await obtenerRecetas({ texto, categoria }, control.signal));
      } catch (e) {
        if (e.name !== 'AbortError') setError('No pudimos cargar las recetas. Revisa tu conexión e inténtalo de nuevo.');
      } finally {
        if (!control.signal.aborted) setCargando(false);
      }
    }

    cargar();
    return () => control.abort();
  }, [texto, categoria]);

  const cambiarBusqueda = (valor) => {
    setBusqueda(valor);
    setPagina(1);
  };

  const cambiarCategoria = (e) => {
    setCategoria(e.target.value);
    setPagina(1);
  };

  const paginas = Math.ceil(recetas.length / RECETAS_POR_PAGINA);
  const visibles = recetas.slice((pagina - 1) * RECETAS_POR_PAGINA, pagina * RECETAS_POR_PAGINA);

  return (
    <section>
      <h1>Recetas</h1>
      <div className="filtros">
        <Buscador valor={busqueda} onCambio={cambiarBusqueda} placeholder="Buscar receta por nombre" />
        <select
          className="campo"
          value={categoria}
          onChange={cambiarCategoria}
          aria-label="Filtrar por categoría"
        >
          <option value="">Todas las categorías</option>
          {categorias.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {cargando && <Mensaje tipo="info">Cargando recetas…</Mensaje>}
      {error && <Mensaje tipo="error">{error}</Mensaje>}
      {!cargando && !error && recetas.length === 0 && (
        <Mensaje tipo="info">No encontramos recetas con esa búsqueda y categoría. Prueba con otro nombre, por ejemplo «chicken», o cambia la categoría.</Mensaje>
      )}

      {!cargando && !error && recetas.length > 0 && (
        <>
          <p className="total">{recetas.length} recetas encontradas</p>
          <div className="grilla">
            {visibles.map((receta) => (
              <Tarjeta key={receta.id} receta={receta} esFavorito={esFavorito(receta.id)} onAlternar={alternar} />
            ))}
          </div>
          <Paginacion pagina={pagina} paginas={paginas} onCambiar={setPagina} />
        </>
      )}
    </section>
  );
}
