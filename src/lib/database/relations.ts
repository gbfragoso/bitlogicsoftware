import { relations } from 'drizzle-orm/relations';
import { users, services, customers, sessions } from './schema';

export const servicesRelations = relations(services, ({ one }) => ({
	user: one(users, {
		fields: [services.userId],
		references: [users.id]
	})
}));

export const usersRelations = relations(users, ({ many }) => ({
	services: many(services),
	customers: many(customers),
	sessions: many(sessions)
}));

export const customersRelations = relations(customers, ({ one }) => ({
	user: one(users, {
		fields: [customers.userId],
		references: [users.id]
	})
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}));
