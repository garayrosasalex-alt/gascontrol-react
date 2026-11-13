// Validaciones de negocio para el registro de clientes (HU-03).
// Son funciones puras: reciben datos y devuelven un objeto con los errores.

export function validarCliente(formulario, clientesExistentes = []) {
  const errores = {};
  const nombre = formulario.nombre.trim();
  const documento = formulario.documento.trim();
  const telefono = formulario.telefono.trim();
  const direccion = formulario.direccion.trim();

  if (nombre.length < 3) {
    errores.nombre = "El nombre es obligatorio (mínimo 3 caracteres).";
  }

  if (!/^\d{8}$/.test(documento)) {
    errores.documento = "El DNI debe tener exactamente 8 dígitos.";
  } else if (clientesExistentes.some((c) => c.documento === documento)) {
    errores.documento = "Ya existe un cliente con ese DNI.";
  }

  if (!/^9\d{8}$/.test(telefono)) {
    errores.telefono = "El teléfono debe tener 9 dígitos y empezar con 9.";
  }

  if (direccion.length === 0) {
    errores.direccion = "La dirección es obligatoria.";
  }

  return errores;
}
