import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Inicio from './pages/Inicio.jsx';
import Lista from './pages/Lista.jsx';
import Detalle from './pages/Detalle.jsx';
import Favoritos from './pages/Favoritos.jsx';
import Registro from './pages/Registro.jsx';
import NoEncontrada from './pages/NoEncontrada.jsx';
import { useFavoritos } from './hooks/useFavoritos.js';

export default function App() {
  const { favoritos, esFavorito, alternar } = useFavoritos();
  const [usuarios, setUsuarios] = useState([]);

  return (
    <div className="app">
      <Navbar totalFavoritos={favoritos.length} totalUsuarios={usuarios.length} />
      <main className="contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/lista" element={<Lista esFavorito={esFavorito} alternar={alternar} />} />
          <Route path="/detalle/:id" element={<Detalle esFavorito={esFavorito} alternar={alternar} />} />
          <Route path="/favoritos" element={<Favoritos favoritos={favoritos} alternar={alternar} />} />
          <Route path="/registro" element={<Registro usuarios={usuarios} setUsuarios={setUsuarios} />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
