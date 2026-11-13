import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// HU-14: página de inicio visible sin sesión.
export default function Home() {
  const { user } = useAuth();

  return (
    <div className="landing">
      <header className="topbar">
        <span className="brand">GasControl</span>
        <Link className="btn btn-secondary" to={user ? "/dashboard" : "/login"}>
          {user ? "Ir al sistema" : "Iniciar sesión"}
        </Link>
      </header>
      <section className="hero">
        <h1>Controla tu distribuidora de gas</h1>
        <p>Stock, ventas, créditos y envases prestados en un solo lugar.</p>
        <Link className="btn btn-primary" to={user ? "/dashboard" : "/login"}>
          Ingresar al sistema
        </Link>
        <div className="chips">
          <span>Control de stock</span>
          <span>Créditos</span>
          <span>Envases</span>
        </div>
      </section>
    </div>
  );
}
