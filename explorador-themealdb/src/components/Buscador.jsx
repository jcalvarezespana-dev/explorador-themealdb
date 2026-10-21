export default function Buscador({ valor, onCambio, placeholder }) {
  return (
    <input
      type="search"
      className="campo"
      value={valor}
      onChange={(e) => onCambio(e.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
    />
  );
}
