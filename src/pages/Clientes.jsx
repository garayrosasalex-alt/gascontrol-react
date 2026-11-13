import { useEffect, useMemo, useState } from "react";
import { obtenerClientes, crearCliente } from "../services/clientesService.js";
import { validarCliente } from "../utils/validaciones.js";

const FORMULARIO_VACIO = { nombre: "", documento: "", telefono: "", direccion: "" };

// HU-03: registrar clientes (con validaciones).
// HU-04 (parcial, Sprint 1): listar y buscar. Editar y eliminar van en el Sprint 2.
export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [guardando, setGuardando] = useState(false);

  // Al abrir la pantalla se cargan los clientes desde la API.
  useEffect(() => {
    obtenerClientes()
      .then(setClientes)
      .catch(() => setErrorCarga("No se pudo cargar la lista de clientes."))
      .finally(() => setCargando(false));
  }, []);

  // Búsqueda por nombre o documento (sin volver a llamar a la API).
  const clientesFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return clientes;
    return clientes.filter(
      (c) => c.nombre.toLowerCase().includes(texto) || c.documento.includes(texto)
    );
  }, [clientes, busqueda]);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
  }

  async function manejarEnvio(evento) {
    evento.preventDefault();
    setMensaje("");

    const erroresEncontrados = validarCliente(formulario, clientes);
    setErrores(erroresEncontrados);
    if (Object.keys(erroresEncontrados).length > 0) return;

    setGuardando(true);
    try {
      const nuevo = await crearCliente({
        nombre: formulario.nombre.trim(),
        documento: formulario.documento.trim(),
        telefono: formulario.telefono.trim(),
        direccion: formulario.direccion.trim(),
      });
      setClientes((anterior) => [...anterior, nuevo]);
      setFormulario(FORMULARIO_VACIO);
      setMensaje("Cliente registrado correctamente.");
    } catch {
      setErrores({ general: "No se pudo guardar el cliente. Intenta de nuevo." });
    } finally {
      setGuardando(false);
    }
  }

  return (
    <>
      <h2>Clientes</h2>

      <form className="card form-grid" onSubmit={manejarEnvio} noValidate>
        <h3>Registrar cliente</h3>

        <div>
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" value={formulario.nombre} onChange={manejarCambio} />
          {errores.nombre && <small className="error">{errores.nombre}</small>}
        </div>

        <div>
          <label htmlFor="documento">DNI</label>
          <input id="documento" name="documento" value={formulario.documento} onChange={manejarCambio} maxLength={8} />
          {errores.documento && <small className="error">{errores.documento}</small>}
        </div>

        <div>
          <label htmlFor="telefono">Teléfono</label>
          <input id="telefono" name="telefono" value={formulario.telefono} onChange={manejarCambio} maxLength={9} />
          {errores.telefono && <small className="error">{errores.telefono}</small>}
        </div>

        <div>
          <label htmlFor="direccion">Dirección</label>
          <input id="direccion" name="direccion" value={formulario.direccion} onChange={manejarCambio} />
          {errores.direccion && <small className="error">{errores.direccion}</small>}
        </div>

        {errores.general && <p className="error full">{errores.general}</p>}
        {mensaje && <p className="ok full">{mensaje}</p>}

        <div className="full">
          <button className="btn btn-primary" type="submit" disabled={guardando}>
            {guardando ? "Guardando..." : "Guardar cliente"}
          </button>
        </div>
      </form>

      <div className="card">
        <div className="list-header">
          <h3>Lista de clientes ({clientesFiltrados.length})</h3>
          <input
            type="search"
            placeholder="Buscar por nombre o DNI"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            aria-label="Buscar cliente"
          />
        </div>

        {cargando && <p className="muted">Cargando...</p>}
        {errorCarga && <p className="error">{errorCarga}</p>}

        {!cargando && !errorCarga && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>DNI</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                </tr>
              </thead>
              <tbody>
                {clientesFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="muted">No hay clientes para mostrar.</td>
                  </tr>
                ) : (
                  clientesFiltrados.map((c) => (
                    <tr key={c.id}>
                      <td>{c.nombre}</td>
                      <td>{c.documento}</td>
                      <td>{c.telefono}</td>
                      <td>{c.direccion}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
