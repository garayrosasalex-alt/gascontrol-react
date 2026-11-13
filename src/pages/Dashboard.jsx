import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { obtenerClientes } from "../services/clientesService.js";

// Dashboard inicial. En el Sprint 1 solo el contador de clientes es real;
// el resto de indicadores se conectará en los siguientes sprints.
export default function Dashboard() {
  const { user } = useAuth();
  const [totalClientes, setTotalClientes] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    obtenerClientes()
      .then((lista) => setTotalClientes(lista.length))
      .catch(() => setError("No se pudo cargar la información."));
  }, []);

  return (
    <>
      <h2>Hola, {user.nombre}</h2>
      <p className="muted">Resumen de tu distribuidora.</p>
      {error && <p className="error">{error}</p>}

      <div className="kpis">
        <div className="kpi">
          <span>Clientes registrados</span>
          <strong>{totalClientes ?? "…"}</strong>
        </div>
        <div className="kpi pending">
          <span>Stock actual</span>
          <strong>—</strong>
        </div>
        <div className="kpi pending">
          <span>Ventas de hoy</span>
          <strong>—</strong>
        </div>
        <div className="kpi pending">
          <span>Deudas pendientes</span>
          <strong>—</strong>
        </div>
        <div className="kpi pending">
          <span>Envases por recuperar</span>
          <strong>—</strong>
        </div>
      </div>
    </>
  );
}
