# Prisma Configuration

## Database Location

The SQLite database is located at: `prisma/TCon360.db`

## Configuration Files

### prisma.config.ts
Located at: `/backend/prisma.config.ts` (backend root, not in prisma/ folder)

This is the Prisma CLI configuration file used by `prisma` commands (migrate, generate, etc.).

Key settings:
- `schema`: Points to `prisma/schema.prisma`
- `migrations.path`: Points to `prisma/migrations`
- `datasource.url`: Uses `DATABASE_URL` env var or falls back to `file:./prisma/TCon360.db`

### .env
Located at: `/backend/.env`

Contains:
```
DATABASE_URL=file:./prisma/TCon360.db
```

This path is relative to the backend root directory where prisma.config.ts is located.

## Path Resolution

### Important: Config Location Matters
When prisma.config.ts is in the backend root (not in prisma/ folder):
- `./prisma/TCon360.db` resolves to `/backend/prisma/TCon360.db` ✅
- `./TCon360.db` would resolve to `/backend/TCon360.db` ❌

### Backend Service
The backend service (`src/prisma/prisma.service.ts`) independently specifies the database location:
- Reads `DATABASE_URL` from environment if set
- Falls back to `file:./prisma/TCon360.db` (relative to process cwd)

## Running Prisma Commands

All Prisma CLI commands should be run from the `/backend/` directory:

```bash
cd backend

# Generate Prisma Client
prisma generate

# Run migrations
prisma migrate dev --name migration_name

# Push schema changes
prisma db push

# Check migration status
prisma migrate status

# Reset database (CAUTION: destroys data)
prisma migrate reset
```

## Environment Variables

The following environment variables are important for Prisma:

- `DATABASE_URL` - Path to the SQLite database (required for most operations)
- When running `npm run start:dev`, DATABASE_URL is automatically set to `file:./prisma/TCon360.db`

## Migration History

The database contains a `_prisma_migrations` table that tracks migration history. Current migrations:
- `20240308083112_init` - Initial migration
- `20250211090410_first` - First schema updates

## Database Initialization

If you need to recreate the database from scratch:

```bash
cd backend

# 1. Remove existing database
rm prisma/TCon360.db

# 2. Run migrations
prisma migrate dev --name initial

# 3. Run seed script (recreates views)
node prisma/seed.mjs
```

The seed script (`prisma/seed.mjs`) creates database views that Prisma doesn't manage:
- `viewCalendarTimeSheet`
- `viewEvents`
- `ViewUserRole`
- `ViewUserDetail`
- `viewStaff`

## Troubleshooting

### "No such table: main.User"
This error typically means the database file path is incorrect. Check:
1. DATABASE_URL is set correctly in `.env`
2. `prisma.config.ts` has the correct datasource url
3. Database file exists at `prisma/TCon360.db`

### Migration creates new database in wrong location
This happens when relative paths don't match the config location. Ensure:
1. `prisma.config.ts` is in `/backend/` root
2. Database path is `file:./prisma/TCon360.db` (not `./TCon360.db`)
3. Run prisma commands from `/backend/` directory

### Views missing after migration
The seed script creates database views. Run:
```bash
cd backend
node prisma/seed.mjs
```
