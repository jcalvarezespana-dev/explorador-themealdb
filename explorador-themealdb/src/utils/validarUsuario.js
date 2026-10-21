export function validarUsuario(datos, usuarios, identificacionActual) {
  const { identificacion, nombre, correo } = datos;

  if (!identificacion || !nombre || !correo) {
    return 'Completa los tres campos: identificación, nombre y correo.';
  }
  if (!/^\d+$/.test(identificacion)) {
    return 'La identificación debe contener solo números.';
  }
  if (!correo.includes('@')) {
    return 'El correo debe incluir «@».';
  }
  const repetida = usuarios.some(
    (u) => u.identificacion === identificacion && u.identificacion !== identificacionActual
  );
  if (repetida) {
    return `Ya existe un usuario con la identificación ${identificacion}.`;
  }
  return null;
}
