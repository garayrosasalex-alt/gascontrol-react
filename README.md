# GasControl (Sprint 1 – MVP)

Aplicación web para controlar el stock, las ventas, los créditos y los envases prestados de una distribuidora de gas.
Hecha con **React (Vite)**, **React Router** y **JSON Server** como API de práctica.

## Cómo ejecutarlo

Requisito: Node.js 18 o superior.

```bash
npm install
npm start
```

`npm start` levanta dos cosas a la vez:
- la API de práctica (JSON Server) en http://localhost:3001
- la aplicación React en http://localhost:5173

Si prefieres dos terminales: `npm run api` en una y `npm run dev` en la otra.

## Usuarios de prueba

| Usuario | Contraseña | Rol |
| --- | --- | --- |
| admin | admin123 | administrador |
| operador | operador123 | operador |

## Qué cubre este Sprint 1

| Historia | Dónde está |
| --- | --- |
| HU-14 Página de inicio | `src/pages/Home.jsx` |
| HU-01 Login y rutas protegidas | `src/pages/Login.jsx`, `src/context/AuthContext.jsx`, `src/components/ProtectedRoute.jsx` |
| HU-03 Registro de cliente con validaciones | `src/pages/Clientes.jsx`, `src/utils/validaciones.js` |
| HU-04 (parcial) Listar y buscar clientes | `src/pages/Clientes.jsx` |

Primer flujo funcional: iniciar sesión → registrar un cliente → verlo en la lista.

## Cómo está organizado (para explicarlo)

- `src/services/`: capa de acceso a datos. `api.js` usa `fetch()` y los demás archivos piden clientes o validan el login.
- `src/context/AuthContext.jsx`: guarda el usuario con sesión y lo persiste en `localStorage`.
- `src/components/`: `ProtectedRoute` (bloquea rutas sin sesión) y `Layout` (header + menú lateral).
- `src/pages/`: una pantalla por archivo.
- `src/utils/validaciones.js`: reglas de negocio puras (DNI de 8 dígitos, teléfono de 9 que empiece con 9, sin DNI duplicado).
- `db.json`: datos de práctica que sirve JSON Server.

## Qué falta (Sprint 2: gestión del negocio)

- HU-04: editar y eliminar clientes (`PUT` y `DELETE` en `clientesService.js`).
- HU-05: productos y stock.
- HU-06: registro de ventas validando el stock.
- HU-13: consulta a una API pública con `fetch()` para autocompletar datos.
- Burndown simple y Sprint Review.

## Subirlo a GitHub (con historial real)

Haz commits pequeños a medida que avances, no uno solo al final. Ejemplos de mensajes:
`feat: configuración inicial del proyecto`, `feat: navegación y layout`, `feat: login con rutas protegidas`,
`feat: registro de clientes con validaciones`, `feat: lista y búsqueda de clientes`.

## Nota de seguridad

JSON Server es solo para practicar: las contraseñas están en texto plano en `db.json` y el login las envía por URL.
En un sistema real, la verificación se hace en un servidor con contraseñas cifradas.
