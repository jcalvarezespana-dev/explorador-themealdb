import { useState } from 'react';
import FormularioUsuario from '../components/FormularioUsuario.jsx';
import ListaUsuarios from '../components/ListaUsuarios.jsx';
import Mensaje from '../components/Mensaje.jsx';
import { validarUsuario } from '../utils/validarUsuario.js';

const FORMULARIO_VACIO = { identificacion: '', nombre: '', correo: '' };

export default function Registro({ usuarios, setUsuarios }) {
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const cambiar = (e) => setFormulario({ ...formulario, [e.target.name]: e.target.value });

  const reiniciar = () => {
    setFormulario(FORMULARIO_VACIO);
    setEditando(null);
  };

  const enviar = (e) => {
    e.preventDefault();
    const datos = {
      identificacion: formulario.identificacion.trim(),
      nombre: formulario.nombre.trim(),
      correo: formulario.correo.trim(),
    };

    const error = validarUsuario(datos, usuarios, editando);
    if (error) {
      setMensaje({ tipo: 'error', texto: error });
      return;
    }

    if (editando === null) {
      setUsuarios([...usuarios, datos]);
      setMensaje({ tipo: 'exito', texto: `Usuario ${datos.nombre} registrado.` });
    } else {
      setUsuarios(usuarios.map((u) => (u.identificacion === editando ? datos : u)));
      setMensaje({ tipo: 'exito', texto: `Cambios de ${datos.nombre} guardados.` });
    }
    reiniciar();
  };

  const editar = (usuario) => {
    setFormulario(usuario);
    setEditando(usuario.identificacion);
    setMensaje(null);
  };

  const cancelar = () => {
    reiniciar();
    setMensaje(null);
  };

  const eliminar = (usuario) => {
    if (!window.confirm(`¿Eliminar a ${usuario.nombre}?`)) return;
    setUsuarios(usuarios.filter((u) => u.identificacion !== usuario.identificacion));
    if (editando === usuario.identificacion) reiniciar();
    setMensaje({ tipo: 'exito', texto: `Usuario ${usuario.nombre} eliminado.` });
  };

  return (
    <section className="registro">
      <h1>Registro de usuarios</h1>
      {mensaje && <Mensaje tipo={mensaje.tipo}>{mensaje.texto}</Mensaje>}
      <div className="registro-columnas">
        <FormularioUsuario
          formulario={formulario}
          editando={editando !== null}
          onCambio={cambiar}
          onEnviar={enviar}
          onCancelar={cancelar}
        />
        <ListaUsuarios usuarios={usuarios} onEditar={editar} onEliminar={eliminar} />
      </div>
    </section>
  );
}
