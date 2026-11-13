import { createContext, useContext, useState } from "react";
import { iniciarSesion } from "../services/authService.js";

// Contexto de sesión: guarda quién inició sesión y lo comparte con toda la app.
const AuthContext = createContext(null);
const CLAVE_STORAGE = "gascontrol_usuario";

function leerUsuarioGuardado() {
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE);
    return guardado ? JSON.parse(guardado) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  // La sesión persiste al recargar la página gracias a localStorage.
  const [user, setUser] = useState(leerUsuarioGuardado);

  async function login(usuario, password) {
    const encontrado = await iniciarSesion(usuario, password);
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(encontrado));
    setUser(encontrado);
    return encontrado;
  }

  function logout() {
    localStorage.removeItem(CLAVE_STORAGE);
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return contexto;
}
