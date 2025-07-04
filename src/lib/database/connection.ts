import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
	dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
} else {
	dotenv.config({ path: '.env' });
}

const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client: queryClient });
