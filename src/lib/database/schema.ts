import {
	boolean,
	date,
	foreignKey,
	integer,
	numeric,
	pgTable,
	primaryKey,
	serial,
	smallint,
	smallserial,
	text,
	timestamp,
	unique,
	uniqueIndex,
	varchar
} from 'drizzle-orm/pg-core';

export const session = pgTable(
	'Session',
	{
		id: text().primaryKey().notNull(),
		userId: text().notNull(),
		expiresAt: timestamp({ precision: 3, mode: 'date' }).notNull()
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: 'Session_userId_User_id_fk'
		})
			.onUpdate('cascade')
			.onDelete('cascade')
	]
);

export const user = pgTable(
	'User',
	{
		id: varchar({ length: 30 }).primaryKey().notNull(),
		passwordHash: varchar('password_hash', { length: 2000 }).notNull(),
		roles: varchar({ length: 50 }).notNull(),
		username: varchar({ length: 30 }).notNull(),
		name: varchar({ length: 255 }).notNull()
	},
	(table) => [
		uniqueIndex('User_username_key').using('btree', table.username.asc().nullsLast().op('text_ops'))
	]
);
