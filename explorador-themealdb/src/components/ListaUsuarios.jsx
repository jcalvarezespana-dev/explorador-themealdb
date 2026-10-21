export default function ListaUsuarios({ usuarios, onEditar, onEliminar }) {
  return (
    <section className="usuarios">
      <h2>Usuarios registrados: {usuarios.length}</h2>
      {usuarios.length === 0 ? (
        <p className="vacio">Aún no hay usuarios registrados</p>
      ) : (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.identificacion} className="usuario">
              <div>
                <strong>{usuario.nombre}</strong>
                <span>ID {usuario.identificacion}</span>
                <span>{usuario.correo}</span>
              </div>
              <div className="usuario-botones">
                <button className="boton boton-claro" onClick={() => onEditar(usuario)}>
                  Editar
                </button>
                <button className="boton boton-peligro" onClick={() => onEliminar(usuario)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
