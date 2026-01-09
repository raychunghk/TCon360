# TCon360

A comprehensive HR and timesheet management system built with modern web technologies. TCon360 provides staff management, leave request handling, timesheet tracking, and administrative dashboards for organizations.

## Overview

TCon360 is a full-stack monorepo combining a NestJS 11 backend API with a Next.js 15 frontend application. The system handles employee onboarding, contract lifecycle management, leave request workflows with document generation, timesheet creation with export capabilities, and administrative tools for calendar/holiday management.

**Key Capabilities:**
- User authentication and role-based access control
- Staff and contract management
- Leave request creation, validation, and document generation
- Timesheet generation and export (Excel)
- Admin dashboard for user/calendar/holiday management
- Calendar integration and vacation scheduling

## Tech Stack

### Backend
- **Framework:** NestJS 11 (modular architecture)
- **Database:** SQLite with Prisma ORM
- **Authentication:** JWT + Argon2
- **File Generation:** ExcelJS (timesheet export), Docx (leave requests)
- **Caching:** NestJS CacheModule
- **Document Conversion:** Unoconv

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI Library:** Mantine UI
- **State Management:** Zustand (persisted)
- **Calendar:** FullCalendar
- **Authentication:** Better Auth (credentials flow) + NextAuth (server actions)
- **HTTP Client:** Axios
- **Data Grid:** Mantine React Table

### Infrastructure & Tools
- **Package Manager:** PNPM
- **Containerization:** Docker (per-app)
- **Database ORM:** Prisma with migrations/seeds

## Project Structure

```
.
├── apps/
│   ├── backend/          # NestJS application
│   │   ├── src/
│   │   │   ├── auth/     # Authentication module
│   │   │   ├── staff/    # Staff management
│   │   │   ├── timesheet/# Timesheet generation
│   │   │   ├── leave-request/ # Leave workflows
│   │   │   ├── admin/    # Admin operations
│   │   │   ├── vacations/# Vacation management
│   │   │   └── health/   # Health checks
│   │   ├── prisma/       # Database schema & migrations
│   │   └── Dockerfile
│   │
│   └── frontend/         # Next.js application
│       ├── app/          # App Router pages
│       ├── components/   # Reusable components
│       ├── services/     # API integration
│       ├── hooks/        # Custom React hooks
│       └── Dockerfile
│
├── packages/
│   └── @tcon360/config   # Shared runtime config
│       └── env-derived settings (proxy paths, auth toggles, token lifetimes)
│
├── pnpm-workspace.yaml
├── docker-compose.yml    # (if present)
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- PNPM 8+
- Docker & Docker Compose (for containerized setup)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd tcon360
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Setup environment variables**
   - Backend: Create `.env` in `apps/backend` (configure DB path, JWT secret, auth settings)
   - Frontend: Create `.env.local` in `apps/frontend` (configure API base path, auth providers)

4. **Setup database**
   ```bash
   cd apps/backend
   pnpm prisma migrate dev
   pnpm prisma db seed
   ```

### Development

Run both backend and frontend in development mode:

```bash
pnpm dev
```

Or run individually:
```bash
# Backend only
pnpm -F backend dev

# Frontend only
pnpm -F frontend dev
```

- **Backend:** Runs on `http://localhost:3000` (or configured port)
- **Frontend:** Runs on `http://localhost:3001` (or configured port)

### Production Build

```bash
# Build all apps
pnpm build

# Build specific app
pnpm -F backend build
pnpm -F frontend build
```

### Docker

```bash
# Build containers
docker-compose build

# Start services
docker-compose up
```

## Architecture

### Backend Architecture

The NestJS backend is organized into modular feature modules:

- **Auth Module:** JWT-based authentication, token validation, user login
- **Staff Module:** Employee profiles, contract management, onboarding workflows
- **Timesheet Module:** Timesheet creation, Excel generation with calendar/holiday calculations
- **Leave Request Module:** Request creation/validation, approval workflows, Docx generation
- **Admin Module:** User/role management, public holiday ingestion (ICS/JSON), calendar seeding, backup/restore
- **Vacations Module:** Vacation scheduling and management
- **Health Module:** Application health checks

**Middleware & Cross-Cutting Concerns:**
- JWT-aware request logging
- CacheModule for shared caching
- Prisma service for database access

### Frontend Architecture

The Next.js frontend uses the App Router for file-based routing:

- **MainShell:** Global layout wrapper that manages staff data, route guards, and navigation
- **Feature Pages:**
  - Calendar view with drawer-based leave request form
  - Staff management with contract tables
  - Timesheet creator (generate and download files)
  - Admin dashboard (tabs for user management, calendar sync, backup/restore)
- **State Management:** Zustand stores for persisted client state
- **API Integration:** Centralized axios services using configured base paths
- **Authentication:** Better Auth for credentials flow + NextAuth for session management and middleware

### Data Flow

1. **Frontend** → API calls via axios (with BetterAuth/NextAuth session)
2. **Backend** → NestJS controllers validate requests, call services
3. **Services** → Execute business logic, interact with Prisma ORM
4. **Database** → SQLite with Prisma migrations
5. **File Generation** → ExcelJS/Docx libraries export files back to frontend

## Core Features

### Leave Request Workflow
- Employees submit leave requests via form
- System validates against contracts and existing leave
- Managers approve/reject
- Automatic Docx document generation
- File storage and download

### Timesheet Management
- Create timesheets with calendar/holiday integration
- ExcelJS generates formatted export files
- Unoconv converts formats if needed
- Employees download generated files

### Admin Dashboard
- User and role management (Mantine React Table)
- Calendar and public holiday sync (ICS/JSON ingestion)
- Backup and restore workflows
- Database seeding utilities

## Development Workflow

1. Create a feature branch
2. Make changes to backend/frontend as needed
3. Run tests (if configured)
4. Commit with clear messages
5. Push and open a pull request
6. Request review

## Environment Configuration

The `@tcon360/config` package provides centralized runtime settings:
- Proxy base paths (backend API URL)
- Auth toggles (BetterAuth vs NextAuth)
- Token lifetimes (JWT expiry)
- Other derived settings from environment

## Scripts

Common commands (run from root):

```bash
pnpm dev                # Start all apps in dev
pnpm build              # Build all apps
pnpm lint               # Lint code
pnpm test               # Run tests
pnpm prisma migrate dev # Run migrations
pnpm prisma db seed     # Seed database
```

## Deployment

See individual Dockerfiles in `apps/backend` and `apps/frontend` for containerization. Deployment guides depend on your hosting platform (Vercel, AWS, etc.).

## Contributing

- Follow the existing code structure and naming conventions
- Ensure new features include appropriate tests
- Update this README if adding major features
- Keep commits focused and descriptive

## Support

For issues or questions, please open an issue in the repository.
