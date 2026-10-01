# SaaS SG-SST (Colombia)

SaaS multi-empresa por suscripción mensual para gestión de Seguridad y Salud en el Trabajo en pequeñas empresas.
Normativa: Ley 1562/2012, Decreto 1072/2015, Res. 0312/2019, GTC 45.

## Ramas (regla estricta)
- `main` = producción. NO se trabaja ni se hace commit directo aquí.
- `qa` = rama de trabajo y pruebas. TODO el desarrollo va en `qa`.
- Se pasa a `main` solo por merge/PR desde `qa` cuando el usuario lo pida.

## Stack
- Frontend: `frontend/` React + Vite + TS (deploy en Vercel)
- Backend: `backend/` Spring Boot 4 / Java 21 (deploy en host con Docker, NO Vercel)
- BD: Neon Postgres (endpoint pooled), migraciones Flyway en `backend/src/main/resources/db/migration`
- Multi-tenant: columna `empresa_id` + filtro Hibernate + RLS

## Arquitectura: MVC (mantener siempre)
- Backend (Spring MVC), paquete `co.sgsst`: `model` (entidades JPA) · `repository` · `service` (lógica) · `controller` (REST, solo delega) · `dto` · `security` · `exception`. Controllers no tocan repositorios.
- Frontend (`frontend/src`): `models` (tipos) · `services` (HTTP) · `controllers` (contexto/estado, p. ej. AuthProvider) · `views` (páginas) · `components` (UI reutilizable) · `theme/tokens.css`.
- Auth: JWT HS256 (`JwtService`), `JwtAuthFilter`, roles en `model/Rol`. Endpoints `/api/auth/{register,login,me}`.
- Pendiente: filtro multi-tenant por `empresa_id` en tablas de negocio (aún no hay tablas de negocio).

## Marca ALMYDEV (frontend)
Tomada de www.almydev.com. Tema oscuro por defecto + claro (`data-theme`), acento azul `#3b82f6`/`#2563eb`, fondos `#080c18/#0d1326/#111a33`, fuente Inter, botones tipo píldora con gradiente, radios 12/20px. Tokens en `frontend/src/theme/tokens.css`; no hardcodear colores en componentes. Logo en `frontend/public/almydev-logo.png`.

## Ejecutar local
- Backend: cargar `.env` en el shell y `./mvnw spring-boot:run` (Spring no lee `.env` solo). Puerto 8080.
- Frontend: `npm run dev` en `frontend/` (5173).
- BD: Neon, rama `qa` para desarrollo; la rama `production` de Neon es la de producción (no tocar).

## Secretos
Nunca en el repo. Solo `.env` local (ver `.env.example`) y variables del host. No pegar credenciales en el chat.
