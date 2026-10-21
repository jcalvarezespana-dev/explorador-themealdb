export default function FormularioUsuario({ formulario, editando, onCambio, onEnviar, onCancelar }) {
  return (
    <form className="formulario" onSubmit={onEnviar} noValidate>
      <label>
        Identificación
        <input
          className="campo"
          name="identificacion"
          value={formulario.identificacion}
          onChange={onCambio}
          inputMode="numeric"
        />
      </label>
      <label>
        Nombre
        <input className="campo" name="nombre" value={formulario.nombre} onChange={onCambio} />
      </label>
      <label>
        Correo
        <input className="campo" name="correo" value={formulario.correo} onChange={onCambio} />
      </label>
      <div className="formulario-botones">
        <button type="submit" className="boton boton-activo">
          {editando ? 'Guardar cambios' : 'Registrar'}
        </button>
        {editando && (
          <button type="button" className="boton boton-claro" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
