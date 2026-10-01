# Daymark — Daily Task Tracker

A desktop-first task tracker built with Next.js, NestJS, PostgreSQL, and Tailwind CSS. Each account has a private task list with priorities, due dates, status, search, and dashboard totals.

## Requirements

- Node.js 22 or newer and npm
- Docker Desktop with Docker Compose, or a local PostgreSQL 14+ server

## 1. Start PostgreSQL

From this folder:

```bash
docker compose up -d db
```

This starts PostgreSQL on `localhost:5432` with database `daily_task_tracker`, user `tracker`, and password `tracker`. Data persists in the `postgres_data` Docker volume. If you use an existing PostgreSQL server, create a database and set its connection string in `backend/.env`.

## 2. Start the backend

Open a terminal in `backend/`:

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

On PowerShell, use `Copy-Item .env.example .env` in place of `cp .env.example .env` if needed. Change `JWT_SECRET` in `backend/.env` to a long random value before using the app beyond local development. The API runs at **http://localhost:4000/api**. In development, TypeORM creates and updates tables automatically.

On the provided Windows environment, if `npm` reports that it cannot find `npm-cli.js` under `AppData\Roaming`, replace `npm` in the commands above with `& 'C:\Program Files\nodejs\node.exe' 'C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js'`.

## 3. Start the frontend

Open a second terminal in `frontend/`:

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

On PowerShell, use `Copy-Item .env.example .env.local` if needed. Open **http://localhost:3000** in your browser. Register an account, then add tasks from the dashboard.

## Checks

Run these from each app directory:

```bash
npm run typecheck
npm run build
```

To format the source, configuration, and documentation files, run these from the project root:

```bash
npm install
npm run format
npm run format:check
```

## API

All API routes start with `/api`. `POST /auth/register` and `POST /auth/login` return a signed JWT and user details. Send `Authorization: Bearer <token>` for `GET /auth/me` and all task routes. Tasks support `GET /tasks`, `GET /tasks/:id`, `POST /tasks`, `PATCH /tasks/:id`, and `DELETE /tasks/:id`. The backend scopes every task query to the authenticated user.

## Environment variables

- `backend/.env`: `DATABASE_URL`, `JWT_SECRET`, `PORT`, and `FRONTEND_URL`.
- `frontend/.env.local`: `NEXT_PUBLIC_API_URL` (default `http://localhost:4000/api`).

The Docker credentials and automatic schema synchronization are intended for local development. For production, set `NODE_ENV=production`, use private database credentials and HTTPS, and manage schema changes with migrations.
