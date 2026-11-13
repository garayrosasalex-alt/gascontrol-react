import { api } from "./api.js";

export const obtenerClientes = () => api.get("/clientes");
export const crearCliente = (cliente) => api.post("/clientes", cliente);
