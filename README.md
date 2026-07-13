# Project 3 — Work Records Platform

Production-oriented internship project for database integration and CRUD workflows. It is a role-based, audited records platform with a Next.js 15 client and an Express/Prisma API.

## Highlights

- Secure signup, verification, login, refresh-session rotation, logout, password reset, and account approval.
- Four RBAC roles: `SUPER_ADMIN`, `ADMIN`, `MANAGER`, `USER`.
- Fully persisted record CRUD, bulk soft-delete, restore, server-side search/filter/pagination, unique references, ownership rules, CSV export, and audit trail.
- Admin dashboard/users/activity workflows; personal dashboard/profile/settings; charts, themes, responsive UI, loading and empty states.
- PostgreSQL constraints/indexes/cascades, Prisma transactions, Redis client, Cloudinary uploads, Socket.io transport, Nodemailer, rate limiting, Helmet, CORS, Zod, Argon2, and Swagger UI.

## Architecture

```
apps/
  api/                 Express REST API
    prisma/            schema + deterministic seed
    src/config/        environment, Prisma and Redis clients
    src/controllers/   HTTP adapters
    src/services/      authentication business rules
    src/repositories/  persistence abstraction
    src/middleware/    auth, RBAC, validation, errors
    src/routes/        versioned API composition
  web/                 Next.js 15 App Router client
    app/               auth, dashboard, admin and user routes
    components/        reusable interactive components
    lib/               authenticated Axios client
docs/ERD.md
```

See [the ER diagram](docs/ERD.md).

## Run locally

1. Copy `.env.example` to `.env` and replace every secret and integration value.
2. Install Node.js 22+ and Docker Desktop.
3. Run `npm install`.
4. Start dependencies: `docker compose up -d postgres redis`.
5. Apply schema and seed: `npm run prisma:migrate -w @project3/api` then `npm run prisma:seed -w @project3/api`.
6. Run `npm run dev` and open `http://localhost:3000`.

The seed administrator is `admin@project3.local` / `Admin123!`. Change it immediately outside local development.

For the fully containerized stack, configure `.env` then run `docker compose up --build`.

## API

Interactive Swagger documentation is at `http://localhost:4000/api-docs`.

| Area | Base route |
| --- | --- |
| Authentication | `/api/v1/auth` |
| Records | `/api/v1/records` |
| Users/profile | `/api/v1/users` |
| Dashboard | `/api/v1/dashboard/stats` |
| Notifications | `/api/v1/notifications` |
| Uploads | `/api/v1/uploads` |
| Exports | `/api/v1/exports/records.csv` |

## Quality gates

`npm run lint`, `npm run build`, and `npm test` are the CI-quality entry points. The GitHub Action runs install and build for each push/PR. Prettier and Husky are configured through root `package.json`.

## Deployment

Deploy the API container to any Docker host with managed PostgreSQL/Redis and Cloudinary credentials. Set `CLIENT_URL` to the deployed web origin and `NEXT_PUBLIC_API_URL` to the API’s `/api/v1` URL. Build and deploy the web Docker image separately, or deploy `apps/web` to Vercel with that public API environment variable. Run `npx prisma migrate deploy` as part of the API release (the supplied Docker command does this).
