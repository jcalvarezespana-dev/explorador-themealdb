export default function Paginacion({ pagina, paginas, onCambiar }) {
  return (
    <div className="paginacion">
      <button className="boton boton-claro" disabled={pagina <= 1} onClick={() => onCambiar(pagina - 1)}>
        Anterior
      </button>
      <span>
        Página {pagina} de {paginas}
      </span>
      <button className="boton boton-claro" disabled={pagina >= paginas} onClick={() => onCambiar(pagina + 1)}>
        Siguiente
      </button>
    </div>
  );
}
