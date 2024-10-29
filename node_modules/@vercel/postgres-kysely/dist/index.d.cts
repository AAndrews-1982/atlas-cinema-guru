import { KyselyConfig, Kysely } from 'kysely';
import { VercelPostgresPoolConfig } from '@vercel/postgres';

declare function createKysely<T>(poolConfig?: VercelPostgresPoolConfig, kyselyConfig?: Partial<KyselyConfig>): Kysely<T>;

export { createKysely };
