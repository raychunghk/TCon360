import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';
import * as path from 'path';
import { fileURLToPath } from 'url';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  /**
   * The standard Prisma client instance used for all database operations.
   * Exposed publicly to allow services to access it directly (e.g., this.prisma.client).
   */
  public readonly client: PrismaClient;

  constructor() {
    let finalDbUrl: string;

    if (process.env.DATABASE_URL) {
      // Use the provided DATABASE_URL directly (supports both absolute and relative paths)
      finalDbUrl = process.env.DATABASE_URL;
      this.logger.log(`Using DATABASE_URL from environment: ${finalDbUrl}`);
    } else {
      // Fallback: Construct relative URL matching prisma.config.js (./prisma/TCon360.db relative to prisma/ folder)
      // This avoids absolute path issues with varying cwd
      finalDbUrl = 'file:./prisma/TCon360.db';

      // Resolve and log absolute path for debugging
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const resolvedAbsolutePath = path.resolve(__dirname, '..', '..', 'prisma', 'TCon360.db');

      this.logger.log(`No DATABASE_URL set; using relative URL: ${finalDbUrl}`);
      this.logger.log(`Resolved absolute database path (for reference): ${resolvedAbsolutePath}`);
    }

    const adapter = new PrismaBetterSqlite3({ url: finalDbUrl });

    this.client = new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }

  async onModuleInit(): Promise<void> {
    await this.client.$connect();
    this.logger.log('Prisma client connected (SQLite direct connection via driver adapter)');
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.$disconnect();
    this.logger.log('Prisma client disconnected');
  }
}