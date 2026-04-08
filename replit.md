# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Project: SK Physics — Shubham Kaushal Tuition Website

### Features
- **Home page** (`/`): Hero, teacher profile, features, recent notes preview, contact info
- **Notes page** (`/notes`): Public grid of all physics PDF notes with search and download
- **Contact page** (`/contact`): Contact form + teacher location/phone info
- **Admin Login** (`/admin`): Password-protected login (password: ShubhamKaushal01010101)
- **Admin Dashboard** (`/admin/dashboard`): Upload/edit/delete PDF notes

### Admin Credentials
- **URL**: `/admin`
- **Password**: `ShubhamKaushal01010101`

### PDF Upload
- If `BLOB_READ_WRITE_TOKEN` is set: PDFs are stored in Vercel Blob Storage
- If not set: Use the "Direct URL" mode to paste an existing PDF URL (e.g., Google Drive, Dropbox)

### Environment Variables
- `DATABASE_URL` — PostgreSQL connection (auto-provisioned by Replit)
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob Storage token (optional, for PDF uploads)
  - Get this from: https://vercel.com/dashboard → Storage → Create Blob Store → Get token

### Teacher Info
- **Name**: Shubham Kaushal
- **Subject**: Physics
- **Phone**: 79062 77324
- **Address**: Near DPS Play School, Near Dr Manoj Jain, Jawahar Ganj Railway Road, Hapur - 245101, Shivpuri area
- **Classes**: XI, XII, JEE/NEET

### DB Schema
- `notes` table: id, title, description, file_url, file_name, created_at, updated_at

### API Routes
- `GET /api/notes` — list all notes (public)
- `POST /api/notes` — create note (requires adminToken)
- `GET /api/notes/:id` — get single note (public)
- `PUT /api/notes/:id` — update note (requires adminToken)
- `DELETE /api/notes/:id` — delete note (requires adminToken)
- `POST /api/admin/login` — admin login, returns token
- `POST /api/admin/upload-url` — get signed Blob upload URL
