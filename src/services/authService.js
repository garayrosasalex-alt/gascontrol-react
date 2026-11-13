import { api } from "./api.js";

// Busca el usuario en la API (JSON Server). Devuelve el usuario SIN la contraseña.
// Nota: JSON Server es una API de práctica; en un sistema real la contraseña
// se verifica en un servidor y nunca se envía en la URL.
export async function iniciarSesion(usuario, password) {
  const lista = await api.get(
    `/usuarios?usuario=${encodeURIComponent(usuario)}&password=${encodeURIComponent(password)}`
  );
  if (lista.length === 0) {
    throw new Error("Usuario o contraseña incorrectos");
  }
  const { password: _omitida, ...usuarioSeguro } = lista[0];
  return usuarioSeguro;
}
