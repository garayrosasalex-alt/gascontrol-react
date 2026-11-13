import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Protege rutas: sin sesión redirige al login; con rol no permitido, al dashboard.
// Uso: <ProtectedRoute roles={["administrador"]}> ... </ProtectedRoute>
export default function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (roles && !roles.includes(user.rol)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
