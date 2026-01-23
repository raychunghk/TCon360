import { defineConfig } from 'prisma/config';

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
    },
    datasource: {
        url: process.env.DATABASE_URL || 'file:./prisma/TCon360.db',
    },
    seed: 'node prisma/seed.mjs',
});
