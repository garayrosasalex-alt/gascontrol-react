import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Diseño base de las pantallas internas: header + menú lateral + contenido.
export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function cerrarSesion() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <span className="brand">GasControl</span>
        <div className="topbar-user">
          <span>
            {user.nombre} · <em>{user.rol}</em>
          </span>
          <button className="btn btn-secondary" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="body">
        <nav className="sidebar">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/clientes">Clientes</NavLink>
        </nav>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
