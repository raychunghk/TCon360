import { defineConfig } from 'prisma/config';

export default defineConfig({
    schema: 'prisma/schema.prisma',  // Path to your schema file if not default
    migrations: {
        path: 'prisma/migrations',     // Adjust if your migrations folder is elsewhere
    },
    datasource: {
        url: 'file:./TCon360.db',      // Your direct SQLite file URL for migrations
    },
    seed: 'node prisma/seed.mjs',
});