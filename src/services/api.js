// Capa de acceso a la API. Aquí se usa fetch() (requisito del Sprint 2).
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function request(path, options = {}) {
  const respuesta = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al llamar a ${path}`);
  }
  return respuesta.json();
}

export const api = {
  get: (path) => request(path),
  post: (path, cuerpo) => request(path, { method: "POST", body: JSON.stringify(cuerpo) }),
};
