import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="login-page">
      <div className="card login-card">
        <h2>Página no encontrada</h2>
        <Link className="btn btn-primary" to="/">Volver al inicio</Link>
      </div>
    </div>
  );
}
