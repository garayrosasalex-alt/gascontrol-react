import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// HU-01: inicio de sesión con usuario y contraseña.
export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destino = location.state?.from?.pathname ?? "/dashboard";

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  // Si ya hay sesión, no tiene sentido mostrar el login.
  if (user) return <Navigate to="/dashboard" replace />;

  async function manejarEnvio(evento) {
    evento.preventDefault();
    setError("");

    if (!usuario.trim() || !password) {
      setError("Ingresa tu usuario y tu contraseña.");
      return;
    }

    setCargando(true);
    try {
      await login(usuario.trim(), password);
      navigate(destino, { replace: true });
    } catch (e) {
      setError(
        e.message.startsWith("Error") || e.message === "Failed to fetch"
          ? "No se pudo conectar con el servidor. ¿Está corriendo la API (npm run api)?"
          : e.message
      );
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="login-page">
      <form className="card login-card" onSubmit={manejarEnvio}>
        <h2>Iniciar sesión</h2>

        <label htmlFor="usuario">Usuario</label>
        <input id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} autoComplete="username" />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {error && <p className="error" role="alert">{error}</p>}

        <button className="btn btn-primary" type="submit" disabled={cargando}>
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
