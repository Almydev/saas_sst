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

## Secretos
Nunca en el repo. Solo `.env` local (ver `.env.example`) y variables del host. No pegar credenciales en el chat.
